const express = require("express");
const router = express.Router();
const Store = require("../schemas/store");
const User = require("../schemas/user");
const Suggest = require("../schemas/suggest");

// 판매처 정보수정 제안 응답
router.post("/suggest", async (req, res) => {
  try {
    let obj;
    obj = {
      code: req.body.code,
      email: req.session.email,
      suggestType: req.body.suggestType,
      Text: req.body.Text,
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


router.post('/update', async (req, res) => {
  try{
    let obj = {
      name: req.body.name,
      bizCode: req.body.bizCode,
      address: req.body.address,
      sellerName: req.body.sellerName,
      phone: req.body.phone,
      email: req.body.email,
      soldTime: req.body.soldTime,
      stockAverage: req.body.stockAverage,
      kidsMask: req.body.kidMask,
      notice: req.body.notice,
    }
    console.log(obj);
    const result = await Store.update({code:req.body.code}, obj);
    console.log(result);
    res.json({message:"수정이 완료되었습니다"});

  }catch(err){
    console.log(err);
    res.json({message:false});
  }
});

router.post('/getInfo', async (req, res) => {
  try{ 
    const storeCode = await User.findOne({email:req.session.email}, {_id:0, code:1});
    
    const info = await Store.findOne({code:storeCode.code});
    
    res.json({info, email:req.session.email});
    
  }catch(err){
    console.log(err);
    res.json({info:false});
  }

});

// 판매처 계정 신청
router.post("/join", async (req, res) => {
  try {
    let obj = {
      code: req.body.code,
      bizCode: req.body.bizCode,
      storeType: req.body.storeType,
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

router.post("/joinfail", async (req, res) => {
  try {
    await Store.remove({ code: req.body.code });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
