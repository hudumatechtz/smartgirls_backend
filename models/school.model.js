const mongoose = require("mongoose");

const SchoolSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
});

module.exports = mongoose.model("School", SchoolSchema);
