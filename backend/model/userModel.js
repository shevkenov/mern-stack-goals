const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name!"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email address!"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"]
    }
},{
    timestamp: true
});

module.exports = mongoose.model("User", userModel);