const express = require("express");
const router = express.Router();
const Store = require("../schemas/store");
const Suggest = require("../schemas/suggest");

// 판매처 정보수정 제안 응답
router.post("/suggest", async (req, res) => {
  try {
    let obj;
    obj = {
      email: req.session.email,
      suggestType: req.body.suggestType,
      Text: req.body.Text
    };
    const suggest = new Suggest(obj);
    await suggest.save();
    console.log("1 suggest inserted");
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
// 판매처 계정 신청
router.post("/join", async (req, res) => {
  try {
    let obj = {
      code:req.body.code,
      bizCode: req.body.bizCode,
      storeType:req.body.storeType,
      storeName: req.body.storeName,
      sellerName: req.body.sellerName,
      address: req.body.address,
      phone: req.body.phone,
    };
    const store = new Store(obj); 
    await store.save();
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/joinfail", async(req, res) =>{

  try{
    await Store.remove({code:req.body.code});
    res.json({message:true});
  }catch(err){
    console.log(err);
    res.json({message:false});
  }
});

module.exports = router;
