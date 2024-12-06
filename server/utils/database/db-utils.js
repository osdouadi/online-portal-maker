const mongoose = require("mongoose");
const systemConfig = require("../../config/system-config");
const messages = require("../../config/messages");

const { database } = messages;

const dbUtils = {
  establishDBConnection: async () => {
    const retries = 3;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const connection = await mongoose.connect(
          systemConfig.database.MONGO_DB_URL,
          {
            dbName: systemConfig.database.MONGO_DB_NAME,
          }
        );

        if (connection) {
          console.log(database.successMessages.DATABASE_CONNECTED);
          return connection;
        }
      } catch (error) {
        console.log(database.errorMessages.DATABASE_CONNECTION);
        process.exitCode = 1;
      }
    }
  },
};

module.exports = dbUtils;
