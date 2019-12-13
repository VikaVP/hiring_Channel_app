// import config

const conn = require('../config/db')
module.exports = {
    getAccounts: (search, limit, offset, order) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM account'
            if (search) {
                query += ` WHERE username LIKE "%${search}%" LIMIT ${limit} OFFSET ${offset} ${order}`
            }
            conn.query(query += ` LIMIT ${limit} OFFSET ${offset} ${order}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    addAccounts: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO account SET ?', data, (err, result) => {
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
            conn.query('SELECT * FROM account WHERE ?', params, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateAccounts: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE account SET ? WHERE id = ?', [data, id], (err, result) => {
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
            conn.query('DELETE FROM account WHERE id = ?', params, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    readAllSortBy: (field, limit, offset, order) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM account ORDER BY ${field} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    },
    page: (page, limit, order) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT COUNT(id) AS total FROM account', (err, total) => {
                if (total[0].total <= limit) {
                    if (Number(page) > 1) {
                        resolve(total[0].total)
                    } else {
                        conn.query(`SELECT * FROM account ORDER BY id LIMIT ${limit} OFFSET ${(Number(page) * limit) - limit} ${order}`, (err, result) => {
                            if (err) reject(err)
                            resolve(result)
                        })
                    }
                } else {
                    conn.query(`SELECT * FROM account ORDER BY id LIMIT ${limit} OFFSET ${(Number(page) * limit) - limit} ${order}`, (err, result) => {
                        if (err) reject(err)
                        resolve(result)
                    })
                }
            })
        })
    }
}
