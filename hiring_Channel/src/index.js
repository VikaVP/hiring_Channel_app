const express = require('express')
const Route = express.Router()

const engineers = require('./routes/engineers')
const companies = require('./routes/companies')
const accounts = require('./routes/accounts')
Route
    .use('/engineers', engineers)
    .use('/companies', companies)
    .use('/accounts', accounts)

module.exports = Route