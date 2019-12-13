const express = require('express')
const Route = express.Router()
const auth = require('../helpers/auth')
const engineers = require('../controllers/engineers')
Route
  .get('/', auth.Check, engineers.getAll)
  .post('/', engineers.postEngineers)
  .get('/:id', engineers.getById)
  .put('/:id', engineers.updateEngineering)
  .delete('/:id', engineers.deleteEngineer)

module.exports = Route
