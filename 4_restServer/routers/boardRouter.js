// 라우터 모듈 -> 스스로 서버를 실행할 수 없음
const express = require("express");
const router = express.Router();
// route : 사용자가 정해진 엔드포인트(URI+METHOD)
//          에 접속할 경우 어떤 서비스를
//          어떤 형태로 제공할 건지 정의하는 것
const boardService = require("../services/boardService.js");
// 게시글 전체 조회 : boards + GET
router.get(`/boards`, async (req, res) => {
  // 해당 경로로 접속했을 때 제공하는 서비스
  // : 게시글의 전체 목록
  let list = await boardService.findAll();
  res.send(list);
});

// GET 방식은 마치 엽서 다 보임
// 게시글 단건 조회 : boards/{bno} + GET  ex) boards/100, boards/1139
router.get(`/boards/:bno`, async (req, res) => {
  const bId = req.params.bno;
  let info = await boardService.findByBoardId(bId);
  res.send(info);
});

// 게시글 단건 등록 : boards + POST
// POST, PUT을 사용하는 경우 반드시 req.body 사용
// POST, PUT 방식은 택배박스(운송장, body)
router.post(`/boards`, async (req, res) => {
  const info = req.body;
  let result = await boardService.addInfo(info);
  res.send(result);
});

// 게시글 단건 수정 : boards/:bno + PUT
router.put(`/boards/:bno`, async (req, res) => {
  const bId = req.params.bno;
  const info = req.body;
  let result = await boardService.updateInfo(bId, info);
  res.send(result);
});

// 게시글 단건 삭제 : boards/:bno + DELETE
router.delete(`/boards/:bno`, async (req, res) => {
  const bId = req.params.bno;
  let info = await boardService.deleteBoard(bId);
  res.send(info);
});

module.exports = router; // 파일의 마지막 코드
