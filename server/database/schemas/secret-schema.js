const mongoose = require("mongoose");
const { security } = require("../../config/messages");

const { Schema } = mongoose;
const { validationMessage } = security;

const secretSchema = new Schema(
  {
    encryptedJWTSecret: {
      type: String,
      required: [true, validationMessage.ENCRYPTED_JWT_SECRET],
    },
  },
  { timestamps: true }
);

secretSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

secretSchema.set("toJSON", {
  virtuals: true
})

module.exports = secretSchema;