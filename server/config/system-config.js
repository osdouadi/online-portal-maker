const systemConfig = {
  // SYSTEM
  port: 8000,
  altPort: 3000,

  // DATABASE
  mongoDBURL: process.env.DATABASE_URL,
  mongoDBName: process.env.DATABASE_NAME,
};

module.exports = systemConfig;