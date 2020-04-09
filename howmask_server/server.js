const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const { stream } = require("./winston");

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
    rolling: true, // 로그인 상태에서 페이지 이동시마다 세션 값 변경 여부
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

app.disable("x-powered-by"); // 공격자에게 Express 사용된 것을 숨김
app.use(helmet.xssFilter()); // XSS 보안 헤더 적용
app.use(helmet.noCache()); // 클라이언트 측 캐싱 방지
app.use(helmet.noSniff()); // X-Content-Type-Options 설정
app.use(helmet.frameguard("deny")); //클릭재킹 보호 (클릭재킹 : 클릭을 유도한 후 내가 클릭하는 부분을 가로채서 다른 것을 누르게 해서 문제를 만드는 방식) *** deny : 프레임 내에 우리 사이트를 넣지 못하게 함

app.enable("trust proxy");
app.use(morgan("combined", { stream })); // 로그 생성 및 파일 저장

app.use("/user", require("./routes/userRouter"));
app.use("/comment", require("./routes/commentRouter"));
app.use("/store", require("./routes/storeRouter"));
app.use("/mask", require("./routes/maskRouter"));

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res, next) => {
//   let apiError = err;

//   if (!err.status) {
//     apiError = createError(err);
//   }

//   if (process.env.NODE_ENV === "start") {
//     const errObj = {
//       req: {
//         headers: req.headers,
//         query: req.query,
//         body: req.body,
//         route: req.route,
//       },
//       error: {
//         message: apiError.message,
//         stack: apiError.stack,
//         status: apiError.status,
//       },
//       user: req.user,
//     };

//     logger.error(`${moment().format("YYYY-MM-DD HH:mm:ss")}`, errObj);
//   } else {
//     res.locals.message = apiError.message;
//     res.locals.error = apiError;
//   }

// render the error page
/* return response(
    res,
    {
      message: apiError.message
    },
    apiError.status
  ) */
// });

app
  .use((_req, res) => {
    res.status(400).send(""); // 잘못된 클라이언트 요청 에러 처리
  })
  .use((_req, res) => {
    res.status(404).send("no such a matching address"); // 잘못된 페이지 요청 에러 처리
  })
  .use((err, req, res) => {
    console.err(err.stack);
    res.status(500).send("internal server error"); // 내부 서버 오류 처리
  });

app.listen(8080, () => {
  console.log("listen umm..umm..um...");
});
