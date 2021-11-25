const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    year: Number,
    phase: String,
    description: String,
   
}, {timestamps: true});

module.exports = mongoose.model("activity", activitySchema);