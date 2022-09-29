import User from '../repositories/users.js'
import arr from '../helpers/arr.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import UploadAvatarService from '../service/local-upload.js'

const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
    try {
        const user = await User.findByEmail(req.body.email)
        

        if (user) {
            
            return res.status(arr.Http.CONFLICT).json({status: 'error', code: arr.Http.CONFLICT, message: 'Email is already used'})
        }
        const {id,name, email,gender,avatar} = await User.create(req.body)
        return res.status(arr.Http.CREATED).json({
            status: 'success',
            code: arr.Http.CREATED,
            data: {
                id,
                name,
                email,
                gender,
                avatar
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findByEmail(req.body.email)
        const isValidPassword = await user ?. isValidPassword(req.body.password)
        if (! user || isValidPassword) {

            return res.status(arr.Http.UNAUTHORIZED).json({status: 'error', code: arr.Http.UNAUTHORIZED, message: 'Invalid credentials'})
        }
        const id = user.id
        const payload = {
            id,
            test: 'the best of the best'
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
        await User.updateToken(id, token)
        return res.json({status: 'success', code: 200, data: {
                token
            }})
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const id = req.user.id
        await User.updateToken(id,null)
        const cats = await User.getAll()
        res.status(arr.Http.NO_CONTENT).json({})
    } catch (error) {
        next(error)
    }
}

const avatars = async (req, res, next) => { 
    try {
        const id = req.user.id
        const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS)
        const avatarUrl = await uploads.saveAvatar({ isUser: id, file: req.file })
        await User.updateAvatar(id, avatarUrl)
        res.json({ status:'success',code:200,data: {avatarUrl} })
    } catch (error) {
        nexnt(error)
    } 
}

export default {register, login, logout,avatars}
