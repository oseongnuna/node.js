const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
const { pool } = require("../db");
const nodemailer = require("nodemailer");
const { sendEmail, config } = require("../nodemailer");

// db 고객정보 -> 엑셀파일 -> 메일첨부발송
// http://localhost:3000/customer/email_customer
// 발신자, 수신자 customer.xlsx를 첨부 발송
router.get("/email_customer", async (req, res) => {
  // 1) 엑셀 생성
  const workbook = xlsx.utils.book_new();
  let [rows] = await pool.query(`select * from customer`);
  // console.log(rows);
  const firstSheet = xlsx.utils.json_to_sheet(rows, {
    header: ["id", "name", "email", "phone"],
  });
  // console.log(firstSheet);
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customer");
  xlsx.writeFile(workbook, "./uploads/customer.xlsx");

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
          path: "./uploads/customer.xlsx",
        },
      ],
    });
    console.log("메일 발송 결과: ", result);
  } catch (err) {
    console.error("메일 발송 실패: ", err);
  }
  res.send("메일발송 성공");
});

module.exports = router;
