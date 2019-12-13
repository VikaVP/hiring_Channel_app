const express = require('express')
const Route = express.Router()

const engineers = require('./routes/engineers')
const companies = require('./routes/companies')
const login = require('./routes/login')

Route
  .use('/', login)
  .use('/engineers', engineers)
  .use('/companies', companies)

module.exports = Route
