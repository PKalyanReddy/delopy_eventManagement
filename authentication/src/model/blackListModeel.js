const { Schema, model } = require("mongoose");

const blackListSchema = new Schema(
  {
    token: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const blackListModel = model("tokenblacklist", blackListSchema);

module.exports = blackListModel;
