const mongoose = require("mongoose");
const systemConfig = require("../config/system-config");

const dbConnect = async () => {
  try {
    const dbConnection = mongoose.connect(systemConfig.mongoDBURL);

    if (dbConnection) {
      console.log("Database Connection Established");
    }
  } catch (error) {
    console.log("Database Connection Failed");
  }
};

module.exports = dbConnect;
