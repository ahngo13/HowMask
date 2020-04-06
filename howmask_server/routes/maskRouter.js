const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/storesByGeo", async (req, res) => {
  
  axios
    .get(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${req.body.lat}&lng=${req.body.lng}&m${req.body.m}`
    )
    //정상 수행
    .then(returnData => {
      //console.log(returnData.data.stores);
      res.json({ storeList: returnData.data.stores });
    })
    //에러
    .catch(err => {
      console.log(err);
    });
});

router.post("/storesByAddr", async (req, res) => {
  addr = encodeURI(req.body.address);
  await axios
    .get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${addr}`)
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

module.exports = router;
