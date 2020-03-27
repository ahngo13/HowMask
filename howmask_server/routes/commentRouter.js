const express = require("express");
const router = express.Router();
const multer = require("multer");
const Comment = require("../schemas/comment");

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "public/upload/");
  },
  filename: function(req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, Date.now() + extension);
  }
});

const upload = multer({
  dest: "public/upload/",
  storage: storage
});

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
    await Comment.update(
      { _id: req.body._id },
      {
        $set: {
          writer: req.body.writer,
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post(
  "/write",
  /* upload.single("imgFile"), */ async (req, res) => {
    try {
      const param = req.body;
      console.log(param);
      let obj;
      obj = {
        code: req.body.code,
        grade: req.body.grade,
        text: req.body.text
      };
      /* 
    if (file == undefined) {
      obj = {
        writer: req.body._id,
        title: req.body.title,
        content: req.body.content
      };
    } else {
      obj = {
        writer: req.body._id,
        title: req.body.title,
        content: req.body.content,
        imgPath: file.filename
      };
    } */

      const comment = new Comment(obj);
      await comment.save();
      res.json({ message: "댓글이 업로드 되었습니다." });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  }
);

router.post("/getCommentList", async (req, res) => {
  try {
    const _id = req.body._id;
    const comment = await Comment.find({ writer: _id }, null, {
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
