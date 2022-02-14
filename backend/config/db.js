const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to URI ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoDB;