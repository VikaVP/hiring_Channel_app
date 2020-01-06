const express = require('express')
const Route = express.Router()
const auth = require('../helpers/auth')
const multer = require('multer')
const engineers = require('../controllers/engineers')
const fileUploadCtrl = require('../controllers/fileUpload')
//const storage = multer.diskStorage({
//  destination: (req, file, cb) => {
//   cb(null, './uploads/images')
//},
//  filename: (req, file, cb) => {
//    let filetype = ''
//    if (file.mimetype === 'image/gif') {
//      filetype = 'gif'
//   }
//    if (file.mimetype === 'image/png') {
//     filetype = 'png'
//    }
//    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//     filetype = 'jpg'
//   }
//console.log(file.mimetype)
//date = new Date()
//   cb(null, 'image-' + date.getHours() + date.getMinutes() + date.getSeconds()+ '.' + filetype)

//  }
//})
//const upload = multer({
//  storage: storage,
//  limits: {
//   fileSize: 1024 * 1024
//  }
//})
Route
  .get('/', engineers.getAll)
  .post('/', fileUploadCtrl.fileUpload, engineers.postEngineers)
  .get('/:id', engineers.getById)
  .put('/:id', fileUploadCtrl.fileUpload, engineers.updateEngineering)
  .delete('/:id', engineers.deleteEngineer)

module.exports = Route
//auth.Check
