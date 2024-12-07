const mongoose = require("mongoose");
const { tenant } = require("../../config/messages");

const { Schema, model } = mongoose;
const { validationMessages } = tenant;

const tenantSchema = new Schema(
  {
    tenantKey: {
      type: String,
      required: [true, validationMessages.TENANT_KEY],
    },
  },
  {
    timestamps: true,
  }
);

tenantSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

tenantSchema.set("toJSON", {
  virtuals: true,
});

module.exports = tenantSchema;
