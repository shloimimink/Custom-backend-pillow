const mongoose = require('mongoose');
const PillowSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  imageId: {
    type: String,
    required: true
  },
  bannerImageUrl: {
    type: String,
    required: true
  },
  bannerImageId: {
    type: String,
    required: false
  },
  galleryImages: [
    {
      imageUrl: String,
      imageId: String,
    }
  ],
  pillowNumber: {
    type: Number,
    required: false
  },
  pillowColor: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('pillow', PillowSchema);