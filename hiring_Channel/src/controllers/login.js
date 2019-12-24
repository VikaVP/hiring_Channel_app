require('dotenv/config')
const loginModel = require('../models/login')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {
    getLogin: (req, res) => {
        const { role, Name } = req.body
        if (role === 'engineer') {
            loginModel.getLogin(Name)
                .then(async result => {
                    console.log(result)
                    if (!result.length) {
                        return res.status(400).json({
                            status: 400,
                            error: true,
                            message: 'User not found!'
                        })
                    }
                    let checking = await bcrypt.compareSync(req.body.password, result[0].password)
                    if (!checking) {
                        console.log(result, req.body.password);

                        return res.status(400).json({
                            status: 400,
                            error: true,
                            message: 'wrong password!'
                        })
                    }
                    let dataId = result[0].id
                    const token = JWT.sign(
                        {
                            Name,
                            dataId
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '48h'
                        }
                    )
                    return res.status(200).json({
                        status: 200,
                        error: false,
                        id: { id: result[0].id, Name: result[0].Name, role: result[0].role },
                        token
                    })

                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'Error login'
                    })
                })
        } else if (role === 'company') {
            loginModel.getLoginCompany(Name)
                .then(async result => {
                    console.log(result)
                    if (!result.length) {
                        return res.status(400).json({
                            status: 400,
                            error: true,
                            message: 'User not found!'
                        })
                    }
                    let checking = await bcrypt.compareSync(req.body.password, result[0].password)
                    if (!checking) {
                        console.log(result, req.body.password);

                        return res.status(400).json({
                            status: 400,
                            error: true,
                            message: 'wrong password!'
                        })
                    }
                    let dataId = result[0].id
                    const token = JWT.sign(
                        {
                            Name,
                            dataId
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '48h'
                        }
                    )
                    return res.status(200).json({
                        status: 200,
                        error: false,
                        id: { id: result[0].id, Name: result[0].Name, role: result[0].role },
                        token
                    })

                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'Error login'
                    })
                })
        }

    }

}
