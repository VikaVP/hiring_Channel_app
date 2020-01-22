// import config

const conn = require('../config/db')
module.exports = {
  getCompanies: (s, page, limit, sort) => {
    let offset = (page - 1) * limit
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM companyData WHERE Name LIKE '%${s}%' ORDER BY Name ${sort} LIMIT ${offset}, ${limit}`
      conn.query(query, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  addCompanies: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO companyData SET ?', data, (err, result) => {
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
      conn.query('SELECT * FROM companyData WHERE ?', params, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateCompany: (data, company_id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE companyData SET ? WHERE id = ?', [data, company_id], (err, result) => {
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
      conn.query('DELETE FROM companyData WHERE id = ?', params, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
