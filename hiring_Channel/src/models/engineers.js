// import config

const conn = require('../config/db')
module.exports = {
    getEngineers: (search) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM engineerData'
            if (search) {
                query += ` WHERE Name LIKE "%${search}%" OR Skill LIKE "%${search}%"`
            }
            conn.query(query += ' LIMIT 10', (err, result) => {
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
            conn.query(`SELECT * FROM engineerData WHERE ?`, params, (err, result) => {
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
            conn.query(`UPDATE engineerData SET ? WHERE id = ?`, [data, engineer_id], (err, result) => {
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
    },
    readAllSortBy: (field) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM engineerData ORDER BY ${field} LIMIT 10`, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    },
    page: (page) => {
        return new Promise((resolve, reject) => {
            const limit = 1
            conn.query(`SELECT COUNT(id) AS total FROM engineerData`, (err, total) => {
                if (total[0].total <= limit) {
                    if (Number(page) > 1) {
                        resolve(total[0].total)
                    } else {
                        conn.query(`SELECT * FROM engineerData ORDER BY id LIMIT ${limit} OFFSET ${(Number(page) * limit) - limit}`, (err, result) => {
                            if (err) reject(err)
                            resolve(result)
                        })
                    }
                } else {
                    conn.query(`SELECT * FROM engineerData ORDER BY id LIMIT ${limit} OFFSET ${(Number(page) * limit) - limit}`, (err, result) => {
                        if (err) reject(err)
                        resolve(result)
                    })
                }
            })


        })
    }
}