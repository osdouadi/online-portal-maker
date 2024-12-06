const systemConfig = {
  // SYSTEM
  PORT: 8000,
  ALT_PORT: 3000,

  // DATABASE
  database: {
    MONGO_DB_URL: process.env.DATABASE_URL,
    MONGO_DB_NAME: process.env.DATABASE_NAME,
  },

  // SECURITY
  security: {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },
};

module.exports = systemConfig;
