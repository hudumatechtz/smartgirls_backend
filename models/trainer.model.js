const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);
