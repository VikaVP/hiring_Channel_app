const express = require('express')
const Route = express.Router()
const login = require('../controllers/login')
Route
    .post('/', login.getLogin)

module.exports = Route
