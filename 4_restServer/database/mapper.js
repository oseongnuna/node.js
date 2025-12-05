// DB에 접속하는 객체에 대한 정의
const mysql = require("mysql2/promise");
const sqlList = require("./sqls/boards.js");

// 1) ConnectionPool 셋팅
const pool = mysql.createPool({
  host: `localhost`,
  user: `dev01`,
  password: `1234`,
  database: `dev`,
  connectionLimit: 5,
});

// 2) 실제 쿼리문 실행하는 메서드
const query = async (selected, values) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let executeSql = sqlList[selected];
    console.log(selected, executeSql);
    let result = (await conn.query(executeSql, values))[0];
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { query };
