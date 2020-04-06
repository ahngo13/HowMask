const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");
const fs = require("fs");
const path = require("path");

connect();

const corsOptions = {
  origin: true,
  credentials: true,
};

fs.readdir("public/upload", (error) => {
  // upl5oads 폴더 없으면 생성
  if (error) {
    fs.mkdirSync("public/upload");
    console.log("upload 폴더 생성됨");
  }
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/userRouter"));
app.use("/comment", require("./routes/commentRouter"));
app.use("/store", require("./routes/storeRouter"));
app.use("/mask", require("./routes/maskRouter"));

app.listen(8080, () => {
  console.log("listen umm..umm..um...");
});
