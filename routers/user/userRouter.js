import express from 'express'
import controllers from '../../controllers/user.js'
import guard from '../../helpers/guard.js'
const router = express.Router()


router.post('/register',controllers.register)
router.post('/login',controllers.login)
router.post('/logout',guard,controllers.logout)
export default router