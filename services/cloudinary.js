const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


module.exports.uploadImage = (path) => {
  return cloudinary.v2.uploader.upload(path, async function(err, result) {
    if (err) {
      throw new Error(err.message);
    }
    return result;
  });
};

module.exports.deleteImage = (id) => {
  return cloudinary.v2.uploader.destroy(id);
};
