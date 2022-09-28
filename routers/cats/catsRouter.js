import express from 'express'
import controllers from '../../controllers/cats.js'
import valid from '../../validation/cats/validation.js'
import guard from '../../helpers/guard.js'
const router = express.Router()

router.get(async(req,res,next)=>{
    console.log(req.url)
    next()
})

router.get('/',guard, controllers.getAll)

router.get('/:id',guard,valid.validateMongoId,controllers.getById)

router.post('/',guard,valid.createCat,controllers.create)

router.delete('/:id',guard,valid.validateMongoId,controllers.remove)

router.put('/:id',guard,valid.validateMongoId,valid.updateCat,controllers.update)

export default router