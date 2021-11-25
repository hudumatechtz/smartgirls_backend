const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    year: Number,
    phases:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phase"
    }]
   
}, {timestamps: true});

module.exports = mongoose.model("activity", activitySchema);