const express = require('express')
const Route = express.Router()

const engineers = require('./routes/engineers')
const companies = require('./routes/companies')
const login = require('./routes/login')
const accounts = require('./routes/accounts')
Route
  .use('/register', accounts)
  .use('/login', login)
  .use('/engineers', engineers)
  .use('/companies', companies)

module.exports = Route
