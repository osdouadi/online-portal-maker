const tenantSchema = require("../schemas/tenant-schema");

const Tenant = model("Tenant", tenantSchema);

module.exports = Tenant;
