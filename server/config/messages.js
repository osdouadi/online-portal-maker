const messages = {
  // DATABASE //
  database: {
    successMessages: {
      DATABASE_CONNECTED: "Database Connection Established",
    },
    errorMessages: {
      DATABASE_CONNECTION: "Database Connection Failed",
      TENANT_DB_CONNECTION: "Tenant Database connection failed",
      TENANT_MODEL_RETRIEVAL: "Retrieval of tenant model failed",
    },
  },
  tenant: {
    validationMessages: {
      TENANT_KEY: "Tenant key is required",
    },
    errorMessages: {
      MISSING_TENANT_KEY: "Tenant KEY was not provided.",
      TENANT_CREATION: "Failed to create tenant.",
    },
  },
  security: {
    validationMessages: {
      ENCRYPTED_JWT_SECRET: "Encrypted JWT Secret is required",
    },
  },
};

module.exports = messages;
