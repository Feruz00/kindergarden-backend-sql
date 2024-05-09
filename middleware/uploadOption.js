const multer = require('multer');
const AppError = require('../utils/appError');
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype.startsWith('image/')) {
        const uploadDirectory = './uploads';
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }
        if (!fs.existsSync('./uploads/image')) {
          fs.mkdirSync('./uploads/image');
        }
      
        cb(null, 'uploads/images');
      } 
      else {
        // For unsupported file types
        cb(new AppError('Invalid file type', 401));
      }
    },
    filename: function (req, file, cb) {
      // Generate a unique filename
      cb(null, Date.now() + '-' + file.originalname);
    }
});
  
const upload = multer({ storage: storage });

module.exports = upload