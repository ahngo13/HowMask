const express = require("express");
const router = express.Router();
const Store = require("../schemas/store");
const Suggest = require("../schemas/suggest");

router.post("/delete", async (req, res) => {
  try {
    await Store.remove({
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
    await Store.update(
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

// 판매처 정보수정 제안 응답
router.post("/suggest", async (req, res) => {
  try {
    let obj;
    obj = {
      email: req.session.email,
      suggestType: req.body.suggestType,
      Text: req.body.Text
    };
    if (req.session.email) {
      const suggest = new Suggest(obj);
      console.log("1 suggest inserted");
      await suggest.save();
      res.json({ message: "ok" });
    } else {
      res.json({ message: "login" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    let obj;

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
    }

    const store = new Store(obj);
    await store.save();
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getStoreList", async (req, res) => {
  try {
    const _id = req.body._id;
    const store = await Store.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: store });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const store = await Store.find({ _id });
    res.json({ store });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
