// xlxs module
// 엑셀 -> json, cvs, ...
const xlsx = require("xlsx");
const { pool } = require("../db");
const nodemailer = require("nodemailer");
const { sendEmail, config } = require("../nodemailer");

async function sendMailAttachFunction() {
  // customer 테이블의 정보 조회 -> customer.xlsx 생성 후 메일 발송
  // 1) 엑셀 생성
  const workbook = xlsx.utils.book_new();
  let [rows] = await pool.query(`select * from customer`);
  // console.log(rows);
  const firstSheet = xlsx.utils.json_to_sheet(rows, {
    header: ["id", "name", "email", "phone"],
  });
  // console.log(firstSheet);
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customer");
  xlsx.writeFile(workbook, "../uploads/customer.xlsx");

  // 2) 메일 발송
  try {
    const result = await sendEmail({
      from: "7040101a@gmil.com",
      to: "uface1117@gmail.com",
      subject: "아니",
      text: "왜그게넘어가냐고",
      attachments: [
        {
          filename: "customer.xlsx",
          path: "../uploads/customer.xlsx",
        },
      ],
    });
    console.log("메일 발송 결과: ", result);
  } catch (err) {
    console.error("메일 발송 실패: ", err);
  }
}

sendMailAttachFunction();

async function db_to_excel() {
  // db -> json -> excel
  const workbook = xlsx.utils.book_new();
  let result = await pool.query(`select * from board`);
  console.log(result[0]); // [{},{}...{}]
  const json = result[0];
  const firstSheet = xlsx.utils.json_to_sheet(json, {
    header: ["board_id", "title", "content", "author", "create_date", "images"],
  });
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Board");
  xlsx.writeFile(workbook, "../uploads/board.xlsx");
  console.log("done");
}
db_to_excel();

function excel_to_db() {
  // 엑셀 -> 시트[0] -> 시트이름 -> 시트활용
  const workbook = xlsx.readFile("../uploads/고객명단.xlsx");
  const sheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[sheetName];
  const sheetJson = xlsx.utils.sheet_to_json(firstSheet);
  console.log(sheetJson);

  for (let i = 0; i < sheetJson.length; i++) {
    console.log(
      sheetJson[i]["이름"],
      sheetJson[i]["이메일"],
      sheetJson[i]["전화번호"]
    );
    pool.execute(`insert into customer set name=?, email=?, phone=?`, [
      sheetJson[i]["이름"],
      sheetJson[i]["이메일"],
      sheetJson[i]["전화번호"],
    ]);
  }
  console.log("done");
}
