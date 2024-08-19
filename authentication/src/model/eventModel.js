const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  date: Date,
  capacity: Number,
  attendees: [{ type: Schema.Types.ObjectId, ref: "users" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  deletedAt: { type: Date, default: null }, // For soft delete
}, {
  timestamps: true,
  versionKey: false,
});

const eventModel = model("events", eventSchema);

module.exports = eventModel;
