const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    imageUrl: String,
    description: String,
    creator: String,
}, {timestamps: true});

module.exports = mongoose.model("article", articleSchema);
