import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import catsRouter from './routers/cats/catsRouter.js'
import userRouter from './routers/user/userRouter.js'
import helmet from 'helmet'
import expressRateLimit from 'express-rate-limit'
import arr from './helpers/arr.js'
import expressQueryBoolean from 'express-query-boolean'
import path from 'path'
import dotenv from 'dotenv'

const app=express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,process.env.AVATAR_OF_USERS)))
app.use(helmet())

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({limit:10000}))
app.use(expressQueryBoolean())
app.use('/users', expressRateLimit(arr.limiter))
app.use('/cats', expressRateLimit(arr.limiter))

app.use('/users',userRouter)
app.use('/cats',catsRouter)

app.use((req, res) => {
    res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
  })
  // uncontrol error
  app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
      status: status === 500 ? 'fail' : 'error',
      code: status,
      message: err.message,
    })
  })

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:',promise,'reason:',reason)
})

  export default app