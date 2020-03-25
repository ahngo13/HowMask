const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const storeSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  store_type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  stock_average: {
    type: String
  },
  operating_time: {
    type: String
  },
  notice: {
    type: String
  },
  sold_expected_time: {
    type: String
  },
  sold_state: {
    type: String
  },
  kids_mask_yn: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Store", storeSchema);
