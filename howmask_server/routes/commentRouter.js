const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const multer = require("multer");
const moment = require("moment");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload/"); // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    cb(null, new Date().valueOf() + moment().format("YYYYMMDDHHmmss") + "_" + file.originalname); // 저장되는 파일명
  }
});

const upload = multer({ storage: storage });

router.post("/delete", async (req, res) => {
  try {
    fs.unlink(`./public${req.body.imageUrl}`, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("디렉토리 파일 삭제 성공");
      }
    });

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
      console.log("수정 완료 로직 진입");
      // 수정 후 입력버튼 클릭 (DB에 수정된 값 저장)
      await Comment.update(
        { _id: req.body._id },
        {
          $set: {
            text: req.body.text
          }
        }
      );
      res.json({ message: "댓글 수정" });
    } else {
      console.log("수정 로직 진입");
      // 수정버튼 클릭  (DB에서 수정할 값 조회)
      const comment = await Comment.find({ _id: req.body._id });
      console.log(comment);
      res.json({ comment: comment });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", upload.single("img"), async (req, res) => {
  try {
    let obj;
    if (req.session.email) {
      if (req.file) {
        const test = req.file.path.split("public");

        obj = {
          email: req.session.email,
          code: req.body.code,
          grade: req.body.grade,
          text: req.body.text,
          image: test[1]
        };
      } else {
        obj = {
          email: req.session.email,
          code: req.body.code,
          grade: req.body.grade,
          text: req.body.text
        };
      }
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

router.post("/getCommentList", async (req, res) => {
  try {
    const comment = await Comment.find({ code: req.body.code }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: comment });
  } catch (err) {
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
