require('dotenv/config')
const JWT = require('jsonwebtoken')
const conn = require('../config/db')
module.exports = {
    Check: (req, res, next) => {
        const rows = conn.query('SELECT username, password from account')
        console.log(rows);

        const { authorization, email, id } = req.headers
        if (!authorization || !email || !id) {
            return res.status(404).json({
                message: 'Unauthorized'
            })
        }
        const token = authorization.split(" ")[1]
        JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err && err.name === 'JsonWebTokenError') {
                return res.status(403).json({
                    message: 'Invalid', err
                })
            }
            if (err && err.name === 'TokenExpiredError') {
                return res.status(403).json({
                    message: 'Expired', err
                })
            }
            if (email !== decoded.email || parseInt(id) !== decoded.id) {

                return res.status(403).json({
                    message: 'Token not valid for selected id/email'
                })

            }

            next()
        })
    }
}