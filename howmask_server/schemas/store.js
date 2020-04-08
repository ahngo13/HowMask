const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const storeSchema = new Schema({
  //마스크 api에서 가져오는 값
  code: {
    type: String,
    required: true,
    unique: true,
  },
  //사업자 등록번호
  bizCode: {
    type: String,
    required: true,
  },
  storeType: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  //관리자 이름
  sellerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // 관리자 휴대전화번호
  phone: {
    type: Number,
  },
  stockAverage: {
    type: String,
  },
  operating_time: {
    type: String,
  },
  notice: {
    type: String,
  },
  soldTime: {
    type: String,
  },
  soldState: {
    type: String,
  },
  kidsMask: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
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

module.exports = mongoose.model("Store", storeSchema);
