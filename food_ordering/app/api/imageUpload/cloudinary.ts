const cloudinary1 = require("cloudinary").v2;

exports.connect = () => {
  try {
    cloudinary1.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
    console.log("Cloudinary Connected Successfully");
  } catch (error) {
    console.log("error connecting Cloudinary" + error);
  }
};
