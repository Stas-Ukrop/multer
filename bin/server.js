import app from '../app.js'
import dotenv from 'dotenv/config'
import db from '../model/db.js'
const PORT = process.env.PORT || 3000

db.then(() => {
    app.listen(PORT, (req, res) => {
        console.log('херня малята')
    })
}).catch(e => {
    console.log(`Error:${
        e.message
    }`)
})
