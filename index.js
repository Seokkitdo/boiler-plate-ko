const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

// application/x-www-form-urlencoded 같은 데이터를 분석
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 타입 데이터를 받아옴
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("연결됐습니다!!!."))
  .catch((err) => console.log(err));

app.get("/", (요청, 응답) => {
  응답.send("Hello World!!!");
});

app.post("/register", (요청, 응답) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(요청.body);

  user.save((에러, 결과) => {
    if (에러) return 응답.json({ success: false, 에러 });
    return 응답.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
