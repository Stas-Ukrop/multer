import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

const uriDB = process.env.MONGO_DB
const db = mongoose.connect(uriDB)

mongoose.connection.on('connected', () => {
    console.log(`Connection open ${uriDB}`)
})

mongoose.connection.on('error', (e) => {
    console.log(`Error mongoose connection ${
        e.message
    }`)
})

mongoose.connection.on('error', (e) => {
    console.log(`Mongoose disconnected `)
})

process.on('SIGINT', async () => {
    mongoose.connection.close('error', () => {
        console.log('Connection to DB terminated')
        process.exit(1)
    })
})

export default db
