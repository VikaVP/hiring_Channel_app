require('dotenv/config')
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB
})
conn.connect(err => {
    if (err) {
        console.log(`Error: \n ${err} \n`)
    } else {
        console.log('Success connect to database')
    }
})
module.exports = conn