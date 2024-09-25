const cloudinary = require("cloudinary").v2;
require("./config/cloudinary").connect();

exports.uploadImageToCloudinary = async (file, { folder, height, quality }) => {
  const options = {
    folder,
    resource_type: "auto",
    ...(height && { height }),
    ...(quality && { quality }),
  };

  try {
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};
