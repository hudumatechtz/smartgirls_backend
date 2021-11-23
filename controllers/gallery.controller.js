const Gallery = require("../models/gallery.model");

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