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

router.post("/write", async (req, res) => {
  try {
    let obj;
    obj = {
      email: req.session.email,
      code: req.body.code,
      grade: req.body.grade,
      text: req.body.text
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
    /* const _id = req.body._id; */
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
