const Pillow = require('../models/Pillow');
const {uploadImage, deleteImage} = require('../services/cloudinary');


// @dec    Get all pillows
// @route  GET /api/v1/pillows
// @access Public
exports.getPillows = async(req, res, next) => {
  try {
    const pillows = await Pillow.find();
    res.json(pillows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

// @dec    Get pillow by ID
// @route  GET /api/v1/pillow/:id
// @access Public
exports.getSinglePillow = async(req, res, next) => {
  try {
    const pillow = await Pillow.findOne({
      _id: req.params.id
    });
    res.json(pillow);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

// @dec    Add pillow
// @route  POST /api/v1/pillows
// @access Public
exports.addPillow = async(req, res, next) => {
  console.log(req.files);
  if (!req.files.image || !req.files.bannerImage) {
    res.status(422).json('no image attached');
    return;
  }
  const imageResult = await uploadImage(req.files.image[0].path);
  const bannerImageResult = await uploadImage(req.files.bannerImage[0].path);
  const imageUrl = imageResult.url;
  const bannerImageUrl = bannerImageResult.url;
  const {pillowNumber, pillowColor, price, size, description} = req.body;
  
  const galleryImages = [];
  
  if (req.files.galleryImages) {
    for (const img of req.files.galleryImages) {
      const result = await uploadImage(img.path);
      galleryImages.push({
        imageUrl: result.url,
        imageId: result.public_id
      });
    }
  }
  
  try {
    const newPillow = new Pillow({
      imageUrl,
      imageId: imageResult.public_id,
      bannerImageId: bannerImageResult.public_id,
      bannerImageUrl,
      pillowNumber,
      pillowColor,
      price,
      size,
      description,
      galleryImages
    });

    const pillow = await newPillow.save();
    res.json(pillow);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

// @dec    Delete pillow
// @route  DELETE /api/v1/pillow/:id
// @access Public
exports.deletePillow = async(req, res, next) => {
  console.log(req.params.id);
  try {
    const pillow = await Pillow.findById(req.params.id);
    await deleteImage(pillow.imageId);
    await deleteImage(pillow.bannerImageId);
    await Pillow.deleteOne({
      _id: req.params.id 
    });
    res.status(200).json(pillow._id);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};
