const mongoose = require("mongoose");
require("dotenv").config();

//MongoDB connection
const ConnectDB = async () => {
    try{
    await mongoose.connect(process.env.MONGO_URI, {})
    console.log("MongoDB connected successfully");
    }
    catch(error){
      console.log("MongoDB connection error:", error);
    };
};
module.exports = ConnectDB;
