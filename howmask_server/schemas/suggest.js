const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const suggestSchema = new Schema({
  suggestType: {
    type: String,
    required: true,
  },
  Text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    ref: "User",
  },
  code: {
    type: String,
    ref: "Store",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Suggest", suggestSchema);
