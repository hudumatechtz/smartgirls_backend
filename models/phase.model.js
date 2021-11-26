const mongoose = require("mongoose");

// SCHEMA SETUP
const phaseSchema = new mongoose.Schema({
    phaseNumber: Number,
    theme: String,
    description: String
});

//Compile into a Model
module.exports = mongoose.model("Phase", phaseSchema);