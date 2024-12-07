const systemConfig = require("../config/system-config");
const secretSchema = require("../database/schemas/secret-schema");
const dbUtils = require("../utils/database/db-utils");
const uniqueKey = require("../utils/generators/unique-key");
const encryptSecretKey = require("../utils/security/key-encryption");
const tenantService = require("./tenant-service");

const tenantService = new tenantService();

class AuthService {
  async createTenantEncryptedJWTSecretKey(tenantKey) {
    const tenantSecretKey = uniqueKey.toString();

    const tenantEncryptedJWTSecretKey = encryptSecretKey(
      tenantSecretKey,
      systemConfig.security.ENCRYPTION_KEY
    );

    const constructedSecretModel = dbUtils.constructModel(
      "Secrets",
      secretSchema
    );

    const Secret = await tenantService.getTenantModel(
      constructedSecretModel,
      tenantKey
    );

    await Secret.create({
      encryptedJWTSecret: tenantEncryptedJWTSecretKey,
    });
  }

  async registerTenant(credentials, tenantKey) {
    const {email} = credentials

  }
}

module.exports = AuthService;