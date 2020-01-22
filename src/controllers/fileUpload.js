const multer = require('multer');

const storage = multer.diskStorage({
     destination: (req, file, callback) => {
         callback(null, './uploads/images');
     },
     filename: (req, file, cb) => {
   let filetype = ''
    if (file.mimetype === 'image/gif') {
     filetype = 'gif'
   }
    if (file.mimetype === 'image/png') {
      filetype = 'png'
    }
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      filetype = 'jpg'
    }
//console.log(file.mimetype)
date = new Date()
    cb(null, 'image-' + req.params.id + date.getHours() + date.getMinutes() + date.getSeconds()+ '.' + filetype)
}
 });

 let fileFilter = function (req, file, cb) {
     var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
     if (allowedMimes.includes(file.mimetype)) {
         cb(null, true);
     } else {
         cb({
             success: false,
             message: 'Invalid file type. Only jpg, png image files are allowed.'
         }, false);
     }
 };
 let obj = {
     storage: storage,
     limits: {
         fileSize: 2 * 1024 * 1024
 },
     fileFilter: fileFilter
 };
 const upload = multer(obj).single('Photo'); 
 exports.fileUpload = (req, res) => {
     upload(req, res, function (error) {
         if (error) { //instanceof multer.MulterError
             res.status(500);
             if (error.code == 'LIMIT_FILE_SIZE') {
                 error.message = 'File Size is too large. Allowed file size is max 2MB';
                 error.success = false;
             }
             return res.json(error);
         } else {
             res.status(200);
             res.json({
                 success: true,
                 message: 'File uploaded successfully!'
             });
         }
     })
 };
