const Gallery = require("../models/gallery.model");

exports.postImage = async (req, res, next) => {
  const { caption } = req.body;
  console.log(req.body);
  let message = "";
  try {
    if (!req.file) {
      const error = new Error("No image file was provided");
      error.statusCode = 422;
      return res.render("add-image", { message: error.message });
    }
    const creator = req.user.username;
    const imageUrl = req.file.path;
    const newImage = new Gallery({
      imageUrl: imageUrl,
      caption: caption,
    });
    const savedImage = await newImage.save();
    if (!savedImage) {
      message = "Image could not be posted";
      return res.render("add-image", { message: message });
    }
    message = "Image was posted successfully, To view go to gallery";
    res.render("add-image", { message: message });
  } catch (error) {
    next(error);
  }
};

exports.getAdminGallery = async (req, res, next) => {
  const gallery = await Gallery.find();
  try {
    res.render("gallery-admin", {
      gallery: gallery,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAddImage = async (req, res) => {
  try {
    res.render("add-image", { message: "" });
  } catch (err) {
    console.error(err);
  }
};