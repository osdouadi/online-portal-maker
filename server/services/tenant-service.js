const { connection } = require("mongoose");
const AppError = require("../utils/error/app-error");
const messages = require("../config/messages");
const tenantUniqueKey = require("../utils/generators/tenant-key");

const { tenant, database } = messages;

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

  async getTenantModel({ model, schema }, tenantKey) {
    try {
      const tenantDBConnection = await this.getTenantDBConnection(tenantKey);
      return await tenantDBConnection.model(model, schema);
    } catch (error) {
      throw new AppError(
        `${database.errorMessages.TENANT_MODEL_RETRIEVAL}`,
        400
      );
    }
  }

  async createtenant() {
    const tenantKey = tenantUniqueKey.toString();
  }
}

module.exports = tenantService;
