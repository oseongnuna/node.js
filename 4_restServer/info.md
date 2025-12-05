REST API(REST SERVER는 특정 언어에 종속되지X)

1. URI : 자원 / METHOD : 기능

- 게시글 전체 조회 boardList : GET | boards: GET
- 게시글 단건 조회 boardInfo : GET | boards/bno : GET
- 게시글 등록 boardInsert : POST | boards : POST
- 게시글 수정 boardUpdate : POST | boards/bno : PUT
- 게시글 삭제 boardDelete : GET(단건) / POST(여러건) | boards/bno : DELETE

2. AJAX : 비동기 방식으로 기반으로 데이터를 주고받는 통신 (fetch...)
   페이지를 받는 게 아니라 데이터를 받음
   => 화면(View)를 제공하지 않음

3. JSON : AJAX를 통해서 데이터를 주고받을 때 데이터의 포맷
   3-1) { key : 'value', key : 'value', key : 'value', ... }
   3-2) [ { key : 'value'}, { key : 'value'}, { key : 'value'}, ...]
   쿼리스트링, 멀티파트폼도 사용

# 게시판 REST Server

: 3계층 구조(3 tier-Architecture) + MVC2
Presentation Layer : 사용자와 상호작용 ( Router + View )
Business Layer : 순수 기능(서비스)
Persistence Layer : Mapper(DB: 디비는 서버가 아님): 디비와 소통함
