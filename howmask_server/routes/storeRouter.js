const express = require("express");
const router = express.Router();
const Store = require("../schemas/store");
const User = require("../schemas/user");
const Suggest = require("../schemas/suggest");
const crypto = require("crypto");

// 판매처 정보수정 제안 응답
router.post("/checkpw", async (req, res) => {
  try {
    let sEmail = req.session.email;
    // 아래의 find는 salt 값 찾기 위해 돌리는 걸로 보고 유지한 쿼리임
    await User.findOne({ email: sEmail }, async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        if (user) {
          //아이디가 존재할 경우 이메일과 패스워드가 일치하는 회원이 있는지 확인
          console.log(req.body.password);
          console.log(user.salt);
          crypto.pbkdf2(
            req.body.password,
            user.salt,
            100000,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
                console.log(err);
              } else {
                // console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='

                const obj = {
                  email: sEmail,
                  password: key.toString("base64"),
                };

                const user2 = await User.findOne(obj);
                console.log(user2);
                if (user2) {
                  // 있으면 로그인 처리
                  // console.log(req.body._id);
                  await User.updateOne(
                    {
                      email: req.session.email,
                    },
                    { $set: { loginCnt: 0 } }
                  );
                  res.json({
                    message: "확인 되었습니다!",
                    dupYn: "0",
                  });
                } else {
                  //없으면 로그인 실패횟수 추가
                  if (user.loginCnt > 4) {
                    res.json({
                      message:
                        "패스워드 입력이 5회 이상 일치하지 않아 잠겼습니다.\n고객센터에 문의 바랍니다.",
                    });
                  } else {
                    await User.updateOne(
                      {
                        email: req.body.email,
                      },
                      { $set: { loginCnt: user.loginCnt + 1 } }
                    );
                    if (user.loginCnt >= 5) {
                      await User.updateOne(
                        {
                          email: req.session.email,
                        },
                        { $set: { lockYn: true } }
                      );
                      res.json({
                        message:
                          "패스워드 입력이 5회 이상 일치하지 않아 잠겼습니다.\n고객센터에 문의 바랍니다.",
                      });
                    } else {
                      res.json({
                        message: "패스워드가 일치하지 않습니다.",
                      });
                    }
                  }
                }
              }
            }
          );
        } else {
          res.json({ message: "패스워드가 일치하지 않습니다." });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "로그인 오류" });
  }
});

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

router.post("/update", async (req, res) => {
  try {
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
    };
    console.log(obj);
    const result = await Store.update({ code: req.body.code }, obj);
    console.log(result);
    res.json({ message: "수정이 완료되었습니다" });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getInfo", async (req, res) => {
  try {
    const storeCode = await User.findOne(
      { email: req.session.email },
      { _id: 0, code: 1 }
    );

    const info = await Store.findOne({ code: storeCode.code });

    res.json({ info, email: req.session.email });
  } catch (err) {
    console.log(err);
    res.json({ info: false });
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
