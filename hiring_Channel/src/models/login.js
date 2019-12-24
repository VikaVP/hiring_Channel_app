
const conn = require('../config/db')
module.exports = {
    getLogin: (Name) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, Name, password FROM engineerData WHERE Name = "${Name}"`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getLoginCompany: (Name) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, Name, password FROM companyData WHERE Name = "${Name}"`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }

}
