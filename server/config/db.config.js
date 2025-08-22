const mongoose = require("mongoose");

//create function to connect

module.exports = async function connectDB() {
    try {
        const connection = await mongoose.connect(
            "mongodb://127.0.01:27017/cohort-tools-api"
        );
        console.log(`connected to db: ${connection.connections[0].name}`);
    } catch (error) {
        console.log(error);
    }
};