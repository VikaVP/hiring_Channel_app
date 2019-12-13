
const conn = require('../config/db')
module.exports = {
    getLogin: (username) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, username, password, role FROM account WHERE username = "${username}"`, username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}