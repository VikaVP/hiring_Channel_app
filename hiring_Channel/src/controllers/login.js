require('dotenv/config')
const loginModel = require('../models/login')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
module.exports = {
    getLogin: (req, res) => {
        const username = req.body.username
        console.log(req.body);

        loginModel.getLogin(username)
            .then(result => {
                if (!result.length) {
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'User not found!'
                    })
                }
                // let checking = bcrypt.compareSync(result[0].password, req.body.password)
                if (req.body.password !== result[0].password) {
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'wrong password!'
                    })
                }
                let dataId = result[0].id
                const token = JWT.sign(
                    {
                        username,
                        dataId
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '24h'
                    }
                )
                res.status(200).json({
                    status: 200,
                    error: false,
                    id: { id: result[0].id, username: result[0].username },
                    token
                })

            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error login'
                })
            })
    }

}
