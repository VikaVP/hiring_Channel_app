const express = require('express')
const Route = express.Router()

const accounts = require('../controllers/accounts')
Route
    .get('/', accounts.getAll)
    .post('/', accounts.postAccounts)
    .get('/:id', accounts.getById)
    .put('/:id', accounts.updateAccounts)
    .delete('/:id', accounts.deleteAccounts)
    .get('/sort/:sort', accounts.sort)
    .get('/page/:page', accounts.page)

module.exports = Route