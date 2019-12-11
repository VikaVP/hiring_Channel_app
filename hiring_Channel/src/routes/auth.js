require('dotenv/config')
const express = require('express')
const JWT = require('jsonwebtoken')
const conn = require('../config/db')
const Route = express.Router()
const auth = require('../helpers/auth')
Route.post('/login', (req, res) => {

    const { email, password } = req.body
    const id = 1993799999
    const token = JWT.sign(
        {
            email,
            id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '5'
        }
    )
    res.status(201).json({
        status: 201,
        message: 'Success login',
        token,
        user: {
            email,
            id
        }
    })
})

Route.get('/secret', auth.Check, (req, res) => {
    res.status(200).json({ msg: 'Authorized' })
})

module.exports = Route