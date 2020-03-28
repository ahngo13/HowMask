const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/storesByGeo", async (req, res) => {
  const send_param = {
    lat: req.body.lat,
    lng: req.body.lng,
    m: req.body.m
  };

  axios
    .get(
      "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json",
      send_param
    )
    //정상 수행
    .then(returnData => {
      // console.log(returnData.data.stores);
      res.json({ storeList: returnData.data.stores });
    })
    //에러
    .catch(err => {
      console.log(err);
    });
});

router.post("/storesByAddr", async (req, res) => {
  const send_param = {
    address: req.body.address
  };

  axios
    .get(
      "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json",
      send_param
    )
    //정상 수행
    .then(returnData => {
      console.log(returnData.data.stores);
      res.json({ storeList: returnData.data.stores });
    })
    //에러
    .catch(err => {
      console.log(err);
    });
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

    const comment = new Comment(obj);
    await comment.save();
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

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
