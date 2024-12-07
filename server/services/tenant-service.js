const { connection } = require("mongoose");
const AppError = require("../utils/error/app-error");
const messages = require("../config/messages");
const uniqueKey = require("../utils/generators/unique-key");
const AuthService = require("./auth-service");
const Tenant = require("../database/models/tenant-model");

const { tenant, database } = messages;

const authService = new AuthService();

class tenantService {
  async getTenantDBConnection(tenantKey) {
    const tenantDBConnections = {};

    try {
      if (!tenantKey) {
        throw new AppError(tenant.errorMessages.MISSING_TENANT_KEY, 400);
      }

      if (!tenantDBConnections[tenantKey]) {
        const dbName = `tenant_${tenantKey}`;
        tenantDBConnections[tenantKey] = connection.useDb(dbName);
      }

      return tenantDBConnections[tenantKey];
    } catch (error) {
      throw new AppError(
        `${database.errorMessages.TENANT_DB_CONNECTION}: ${error.message}`,
        400
      );
    }
  }

  async getTenantModel({ modelName, schema }, tenantKey) {
    try {
      const tenantDBConnection = await this.getTenantDBConnection(tenantKey);
      return await tenantDBConnection.model(modelName, schema);
    } catch (error) {
      throw new AppError(
        `${database.errorMessages.TENANT_MODEL_RETRIEVAL}`,
        400
      );
    }
  }

  async createTenant() {
    try {
      const tenantKey = uniqueKey.toString();
      await authService.createTenantEncryptedJWTSecretKey(tenantKey);
      return await Tenant.create({ tenantKey: tenantKey });
    } catch (error) {
      throw new AppError(
        `${messages.tenant.errorMessages.TENANT_CREATION}: ${error.message}`,
        400
      );
    }
  }
}

module.exports = tenantService;
