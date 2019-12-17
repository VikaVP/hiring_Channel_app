const express = require('express')
const Route = express.Router()
const multer = require('multer')
const companies = require('../controllers/companies')
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
  .get('/', companies.getAll)
  .post('/', (upload.single('Logo')), companies.postCompanies)
  .get('/:id', companies.getById)
  .put('/:id', (upload.single('Logo')), companies.updateCompanies)
  .delete('/:id', companies.deleteCompany)

module.exports = Route
