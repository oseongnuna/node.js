// nodemailer 모듈
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "7040101a@gmail.com",
    pass: "cxsw ymhb hjqx vnyv",
  },
};

const sendEmail = (data) => {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport(config);
    transport.sendMail(data, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(info);
      if (info.accepted.length > 0) {
        console.log("done");
        resolve({ receiver: info.accepted[0], msg: "정상 발송됨" });
      } else {
        resolve({ receiver: "없음", msg: "수신자가 없음" });
      }
    });
  });
};

// 파일첨부
function sendMailAttachFunc() {
  let transport = nodemailer.createTransport(config);
  transport.sendMail(
    {
      from: "7040101a@gmil.com",
      to: "uface1117@gmail.com, durms2855@daum.net, jgh1107@daum.net",
      subject: "파일첨부테스트",
      text: "파일첨부테스트",
      attachments: [
        {
          filename: "board.xlsx",
          path: "../uploads/board.xlsx",
        },
        {
          filename: "1764575543891-tocomon.png",
          path: "../uploads/1764575543891-tocomon.png",
        },
      ],
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("send");
    }
  );
}
// sendMailAttachFunc();

module.exports = { sendEmail, config };
