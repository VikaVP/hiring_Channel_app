// import config 

const conn = require('../config/db')
module.exports = {
    getEngineers: (s, page, limit, sort, sortBy) => {
        let offset = (page - 1) * limit
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM engineerData WHERE Name LIKE '%${s}%' OR Skill LIKE '%${s}%' ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`
            conn.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    addEngineers: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO engineerData SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getById: (params) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM engineerData WHERE ?', params, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateEngineer: (data, engineer_id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE engineerData SET ? WHERE id = ?', [data, engineer_id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteById: (params) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM engineerData WHERE id = ?', params, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}
