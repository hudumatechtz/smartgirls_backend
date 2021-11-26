const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);
