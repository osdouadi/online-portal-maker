const Cryptr = require("cryptr");

const encryptSecretKey = (providedKey, encryptionKey) => {
  const cryptr = new Cryptr(encryptionKey);
  return cryptr.encrypt(providedKey);
};

module.exports = encryptSecretKey;