const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload/"); // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    cb(null, moment().format("YYYYMMDDHHmmss") + "_" + file.originalname); // 저장되는 파일명
  }
});

const upload = multer({ storage: storage });

router.post("/delete", async (req, res) => {
  try {
    await Comment.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    if (req.body.flag) {
      await Comment.update(
        { _id: req.body._id },
        {
          $set: {
            text: req.body.text
          }
        }
      );
      res.json({ message: "게시글이 수정 되었습니다." });
    } else {
      const comment = await Comment.find({ _id: req.body._id }, { _id: false });
      res.json({ comment: comment });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/write_file", upload.single("img"), async (req, res) => {
  // FormData의 경우 req로 부터 데이터를 얻을수 없다.
  // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다
  try {
    console.log(req);
  } catch (err) {
    console.log(err);
  }
});
router.post("/write", upload.single("img"), async (req, res) => {
  try {
    let obj;
    obj = {
      email: req.session.email,
      code: req.body.code,
      grade: req.body.grade,
      text: req.body.text,
      image: req.file.path
    };
    if (req.session.email) {
      const comment = new Comment(obj);
      console.log("1 comment inserted");
      await comment.save();
      res.json({ message: "ok" });
    } else {
      res.json({ message: "login" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/getCommentAggregation", async (req, res) => {
  try {
    const code = req.body.storeCode;
    const comment = await Comment.aggregate([
      { $match: { code: { code } } },
      { $group: { count: { $text: 1 } } }
    ]);
    console.log(comment);
    res.json({ count: comment });
  } catch (err) {
    res.json({ message: false });
  }
});
router.post("/getCommentList", async (req, res) => {
  try {
    const comment = await Comment.find({ code: 111 }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: comment });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const comment = await Comment.find({ _id });
    res.json({ comment });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
