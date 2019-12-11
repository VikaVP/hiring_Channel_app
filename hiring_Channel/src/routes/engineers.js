const express = require('express')
const Route = express.Router()

const engineers = require('../controllers/engineers')
Route
    .get('/', engineers.getAll)
    .post('/', engineers.postEngineers)
    .get('/:id', engineers.getById)
    .put('/:id', engineers.updateEngineering)
    .delete('/:id', engineers.deleteEngineer)
    .get('/sort/:sort', engineers.sort)
    .get('/page/:page', engineers.page)

module.exports = Route