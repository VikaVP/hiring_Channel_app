const express = require('express')
const Route = express.Router()
const accounts = require('../controllers/accounts')
Route
    .get('/', accounts.getAccounts)
    .post('/', accounts.postAccounts)
    .put('/:id', accounts.updateAccounts)
    .delete('/:id', accounts.deleteAccounts)

module.exports = Route