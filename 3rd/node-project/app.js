const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { pool } = require("../node-project/db");
const { sendEmail } = require("./nodemailer");
const path = require("path");

const userRoute = require("./routes/users"); // 회원정보
const boardRoute = require("./routes/board"); // 게시글정보
const customerRoute = require("./routes/customer");

const app = express();
const PORT = 3000;

// 셋업.
app.use(cors());
app.use(express.json({ limit: "20mb" })); // 요청정보 body : json 처리.

app.use("/user", userRoute); // http://localhost:3000/user/login
app.use("/board", boardRoute); // http://localhost:3000/board/boards
app.use("/customer", customerRoute); // http://localhost:3000/customer/email_customer

app.use(express.static("public")); //p.127

// 라우팅. http://localhost:3000/
// 요청방식 + 리소스 => 처리될정보.
app.get("/", (req, res) => {
  console.log("/ 경로가 호출");
  res.send("/ 호출됨.");
});

app.get("/index", (req, res) => {
  fs.readFile("./data.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    let html = data //
      .split("\r\n")
      .reduce((acc, elem) => {
        acc += "<li>" + elem + "</li>";
        return acc;
      }, "<ul>");
    res.send(html + "</ul>");
  });
});

app.get("/callApi", async (req, res) => {
  let url =
    "https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&returnType=json&serviceKey=QhTI%2FbTf0KSUkFQ7GhUih1pRwSjB6eqlLmhPfoMa%2B2plPIm7FEoLl1W0Pl8WM23m2%2Bn%2FaqApxDYQiz%2FPunib9A%3D%3D";
  let result = await fetch(url);
  let data = await result.json();
  console.log(data.data);
  // center 테이블에 데이터 입력 처리
  // mysql에서 한번에 여러건 입력하는 구문
  // isnert into center (id, center_name, address, phone_number, sido) values();

  // for (let elem of data.data) {
  //   let result = await pool.execute(`insert into center values(?,?,?,?,?)`, [
  //     elem.id,
  //     elem.centerName,
  //     elem.address,
  //     elem.phoneNumber,
  //     elem.sido,
  //   ]);
  // }

  let input = "";
  for (let elem of data.data) {
    if (elem.id == data.data.length) {
      input += `(${elem.id},'${elem.centerName}','${elem.address}','${elem.phoneNumber}','${elem.sido}')`;
    } else {
      input += `(${elem.id},'${elem.centerName}','${elem.address}','${elem.phoneNumber}','${elem.sido}'),`;
    }
  }
  console.log(input);

  res.send(await pool.execute(`insert into center values ${input}`));
});

app.post("/email", async (req, res) => {
  const data = req.body;
  console.log(data); //{from:.., to:.., subject:.., text:..}
  if (!data) {
    res.json({ retCode: "NG", retMsg: "입력된 값이 없습니다." });
    return;
  }
  const result = await sendEmail(data);
  res.json({ retCode: "OK", retMsg: result });
});

app.get("/image/:filename", async (req, res) => {
  const { filename } = req.params;
  // upload/filename
  let filepath = path.join(__dirname, "/uploads", filename);
  console.log(filepath);
  res.sendFile(filepath);
});

// 서버실행.
app.listen(PORT, () => {
  console.log(`server running .. http://localhost:${PORT}`);
});
