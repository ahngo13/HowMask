const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  email: {
    type: String,
    required: true,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
    ref: "Store",
  },
  grade: {
    type: Number,
    required: true,
  },
  // 컬럼 추가 : text
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  mine: {
    type: Boolean,
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

module.exports = mongoose.model("Comment", commentSchema);
