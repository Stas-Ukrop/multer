import mongoose from 'mongoose'
const {Schema, model} = mongoose
import gr from 'gravatar'
import constanta from '../helpers/arr.js'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv/config'

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        default: 'Guest'
    },
    age: {
        type: Number,
        min: 0,
        max: 35
    },
    gender: {
        type: String,
        enum: [
            constanta.Gender.FAMALE, constanta.Gender.MALE, constanta.Gender.NONE
        ],
        default: constanta.Gender.NONE
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/g
            return re.test(String(value).toLowerCase())
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: function () {
            return gr.url(this.email,{s:'250'},true)
        }
    }
}, {
    versionKey: false,
    timestamps: true
},)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        const salt = await bcryptjs.getSalt(process.env.SALT_WORK)
        this.password = await bcryptjs.hash(this.password, salt)
    }
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcryptjs.compare(password, this.password)
}

const User = model('user', userSchema)

export default User
