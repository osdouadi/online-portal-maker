const { Schema } = require("mongoose");
const messages = require("../../config/messages");
const systemConfig = require("../../config/system-config");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    tenantKey: {
      type: String,
      trim: true,
      required: [true, messages.user.validation.TENANT_KEY],
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, messages.user.validation.FIRST_NAME],
      min: [
        systemConfig.schemaValidations.USER_NAME_MIN_LENGTH,
        messages.user.validation.USER_NAME_MIN_LENGTH,
      ],
      max: [
        systemConfig.schemaValidations.USER_NAME_MAX_LENGTH,
        messages.user.validation.USER_NAME_MAX_LENGTH,
      ],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, messages.user.validation.LAST_NAME],
      min: [
        systemConfig.schemaValidations.USER_NAME_MIN_LENGTH,
        messages.user.validation.USER_NAME_MIN_LENGTH,
      ],
      max: [
        systemConfig.schemaValidations.USER_NAME_MAX_LENGTH,
        messages.user.validation.USER_NAME_MAX_LENGTH,
      ],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, messages.user.validation.EMAIL],
    },
    password: {
      type: String,
      trim: true,
      required: [true, messages.user.validation.PASSWORD],
    },
    role: {
      type: String,
      enum: systemConfig.schemaValidations.USER_RULES,
      default: systemConfig.schemaValidations.DEFAULT_RULE,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = await bcrypt.hash(
      this.password,
      systemConfig.security.ENCRYPTION_SALT
    );
  }
});

userSchema.methods.isPasswordValid = async function (
  insertedPassword,
  passwordFromDB
) {
  return await bcrypt.compare(insertedPassword, passwordFromDB);
};

module.exports = userSchema;
