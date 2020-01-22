
const conn = require('../config/db')
module.exports = {
    getLogin: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, Name, password FROM engineerData WHERE email = "${email}"`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getLoginCompany: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, Name, password FROM companyData WHERE email = "${email}"`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }

}
