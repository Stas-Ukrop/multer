import express from 'express'
import controllers from '../../controllers/user.js'
import guard from '../../helpers/guard.js'
import upload from '../../helpers/upload.js'
const router = express.Router()


router.post('/register',controllers.register)
router.post('/login',controllers.login)
router.post('/logout', guard, controllers.logout)
router.patch('/avatars',guard,upload.single('avatar'),controllers.avatars)
export default router