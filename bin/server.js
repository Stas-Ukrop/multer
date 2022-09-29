import app from '../app.js'
import dotenv from 'dotenv/config'
import db from '../model/db.js'
import createFolderIsNotExist from '../helpers/create-folder.js'

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS

db.then(() => {
    app.listen(PORT, async (req, res) => {
        await createFolderIsNotExist(UPLOAD_DIR)
        await createFolderIsNotExist(AVATAR_OF_USERS)
        console.log('херня малята')
    })
}).catch(e => {
    console.log(`Error:${
        e.message
    }`)
})
