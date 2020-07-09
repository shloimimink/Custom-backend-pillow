
const express = require('express');
const router = express.Router();
const {getPillows, getSinglePillow, addPillow, deletePillow} = require('../controllers/pillows');

//IMAGE UPLOAD CONFIGURATION
const multer = require('multer');
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
// accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are accepted!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

router
  .route('/')

  .get(getPillows)
  .post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }, { name: 'galleryImages' }]), addPillow);

router
  .route('/:id')
  .get(getSinglePillow)
  .delete(deletePillow);

module.exports = router;