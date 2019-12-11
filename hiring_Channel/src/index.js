const express = require('express')
const Route = express.Router()

const engineers = require('./routes/engineers')
const companies = require('./routes/companies')
const accounts = require('./routes/accounts')
const login = require('./routes/auth')

Route
    .use('/engineers', engineers)
    .use('/companies', companies)
    .use('/accounts', accounts)
    .use('/', login)

module.exports = Route