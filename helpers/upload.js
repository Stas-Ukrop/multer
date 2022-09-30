import multer from 'multer'
import dotenv from 'dotenv/config'
const UPLOAD_DIR = process.env.UPLOAD_DIR


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now().toString()}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage, limits: { fileSize: 2000000 }, fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            
            return cb(null, true)
        }
        const error= new Error('Накой ты мне это шлешь?')
        error.status = 400
        cb(error)
} })

export default upload