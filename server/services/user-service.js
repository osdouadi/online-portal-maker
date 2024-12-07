const dbUtils = require("../utils/database/db-utils");
const tenantService = require("./tenant-service");

const tenantService = new tenantService()

class UserService {
  async findUserByEmail(email, tenantKey) {
    const constructedUserModel = dbUtils.constructModel("User")
    const User = await tenantConnectionService.getTenantModel(
      userModelProvider,
      tenantKey
    );
    return await User.findOne({ email: email });
  }
}

module.exports = UserService;
