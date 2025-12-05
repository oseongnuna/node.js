// Table : board
// 쿼리문만 저장

// 전체조회
const selectAll = `SELECT board_id
      , title
      , content
      , author
      , create_date
FROM board
ORDER BY board_id`;

// 단건 조회
const selectById = `SELECT board_id
      , title
      , content
      , author
      , create_date
FROM board
WHERE board_id = ?`;

// 단건 등록
const insertInfo = `
INSERT INTO board (title, content, author)
VALUES ( ?, ?, ?)`;
// SET ? `;
// 1) ?의 갯수 2) ?가 매칭되는 컬럼이 정확한가
/*
 { 'title' : 'Oracle', 'content' : 'SQL수업' }
  => SET title='Oracle', content = 'SQL수업'
*/

// 단건 수정
const modifyInfo = `
UPDATE board
SET title=?, content=?, author=?
where board_id = ?;
`;

// 단건 삭제
const delInfo = `
delete from board
where board_id = ?
`;

module.exports = {
  selectAll,
  selectById,
  insertInfo,
  modifyInfo,
  delInfo,
};
