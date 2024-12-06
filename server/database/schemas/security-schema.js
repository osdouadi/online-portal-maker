const mongoose = require("mongoose");
const { security } = require("../../config/messages");

const { Schema } = mongoose;
const { validationMessage } = security;

const securitySchema = new Schema(
  {
    encryptedJWTSecret: {
      type: String,
      required: [true, validationMessage.ENCRYPTED_JWT_SECRET],
    },
  },
  { timestamps: true }
);

securitySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

securitySchema.set("toJSON", {
  virtuals: true
})

module.exports = securitySchema