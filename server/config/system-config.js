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
    ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
  },

  // SCHEMA
  schemaValidations: {
    USER_RULES: ["superAdmin", "admin", "manager"],
    DEFAULT_RULE: "admin",
    USER_NAME_MIN_LENGTH: 1,
    USER_NAME_MAX_LENGTH: 15,
  },
};

module.exports = systemConfig;
