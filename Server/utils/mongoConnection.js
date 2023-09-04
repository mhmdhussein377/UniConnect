const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoConnection = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    });

module.exports = mongoConnection;