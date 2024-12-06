const systemConfig = require("../config/system-config");
const uniqueKey = require("../utils/generators/unique-key");
const encryptSecretKey = require("../utils/security/key-encryption");

class AuthService {
  async createtenantUniqueSecretKey(tenantKey) {
    const tenantSecretKey = uniqueKey.toString();

    const tenantEncryptedSecretKey = encryptSecretKey(
      tenantSecretKey,
      systemConfig.security.ENCRYPTION_KEY
    );
  }
}
