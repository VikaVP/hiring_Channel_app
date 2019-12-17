const express = require('express')
const Route = express.Router()
const auth = require('../helpers/auth')
const multer = require('multer')
const engineers = require('../controllers/engineers')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images')
  },
  filename: (req, file, cb) => {
    let filetype = ''
    if (file.mimetype === 'image/gif') {
      filetype = 'gif'
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png'
    }
    if (file.mimetype === 'image/jpg') {
      filetype = 'jpg'
    }
    cb(null, 'image-' + Date.now() + '.' + filetype)

  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024
  }
})
Route
  .get('/', auth.Check, engineers.getAll)
  .post('/', (upload.single('Logo')), engineers.postEngineers)
  .get('/:id', engineers.getById)
  .put('/:id', (upload.single('Logo')), engineers.updateEngineering)
  .delete('/:id', engineers.deleteEngineer)

module.exports = Route
