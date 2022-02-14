const mongoose = require("mongoose");

const goalsModel = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text']
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Goal', goalsModel);