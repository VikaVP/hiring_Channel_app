const express = require('express')
const Route = express.Router()
const login = require('../controllers/login')
Route
    .get('/', login.getLogin)

module.exports = Route
