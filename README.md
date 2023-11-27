# 23.11.25 변경 사항 (front_back)
**오답노트 기능 구현** - AnswerNote 데이터베이스 구축 및 RESTful API 구현
- #### AnswerNote 데이터베이스 구축
  <img src="https://github.com/na011109/Capstone-Design/assets/114457973/8b75d015-7af6-4129-b0c4-52d7d752659b.png" width="500" />
  
  - **id**: tuple 식별 번호
  - **username**: 현재 로그인 중인 사용자ID (req.session.nickname)
  - **problem**: 제시된 원문
    - problem은 NULL 값 가능하도록 (Substitute에만 있기 때문~)
  - **options**: 선택지
    - JSON 형식 그대로 저장 → 불러올 때, JSON.parse()를 통해 문자열을 JSON으로 변환
  - **selectedIndex**: 선택한 선택지 인덱스 번호
  - **answerIndex**: 정답 선택지 인덱스 번호
  - **timestamp**: 데이터베이스 저장 당시 시간

<br>

- #### List.js, Problem.js, Check.js (추가된 파일)
  - **List.js - [오답노트 화면]**: 오답 퀴즈 리스트 표시
    - 일단 데이터베이스에 저장한 시간(timestamp 속성 값)으로 문제 구분
    - Problem.js로 이동 시, 선택한 오답 문제 id 값 전달
  - **Problem.js - [오답노트 - 퀴즈 화면]**: 오답 퀴즈 풀이 (일반 퀴즈 화면과 동일)
    - problem은 NULL이 아닌 경우에만 표시
    - Check.js로 이동 시, 모든 데이터 전달
      *재풀이 때 선택한 선택지도 함께 전달
  - **Check.js - [오답노트 - 정답 확인 화면]**: 오답 퀴즈 정답 확인
    - problem은 NULL이 아닌 경우에만 표시
    - **공통**
      - `확인`: List.js으로 화면 전환
      - `이전에 선택한 선택지`: 퀴즈 첫 풀이 때 선택한 선택지 표시
    - **정답**
      - AnswerNote 데이터베이스에 해당 퀴즈 데이터 삭제
    - **오답**
      - 데이터베이스 영향 X
      - `다시 풀기`: 현재 id를 Problem.js에 다시 전달해 퀴즈 재풀이
      - `정답 확인`: 해당 퀴즈의 정답 표시
      <br>
    *`정답 확인`, `이전에 선택한 선택지`는 클릭할 때마다 보이기/숨기기로 설정 가능
  ###### ⭐이름은 임시로 지었어요.. ^_^
- #### <server.js> 데이터베이스, 프론트엔드와의 통신을 위한 엔드포인트 추가
  - **'/answernote'**: 데이터베이스에 오답 퀴즈 저장
    - [정답 확인 화면]에서 selectedIndex와 answerIndex가 서로 다른 경우(오답인 경우)에만 저장 
  - **'/getList'**: 데이터베이스에서 오답 퀴즈 리스트 불러오기
    - 현재 로그인 중인 username에 해당하는 퀴즈 리스트만 표시할 수 있게 설정
  - **'/getProblem/:id'**: 리스트에서 선택한 오답 퀴즈 데이터(problem, options, selectedIndex, answerIndex) 불러오기
    - Problem.js에는 'getProblem/${selectedId}'로 fetch 설정
    - selectedId: List.js에서 전달받은 id 값
  - **'/deleteProblem/:id'**: 재풀이하여 정답일 시, id 값에 해당하는 tuple 삭제

<br>

### <추후 구현>
- 전체적인 페이지 width 조금만 줄여주세요 ㅎㅎ..
- QuizController: `정답 확인`, `다음 문제` 버튼 수정
  - Problem.js: `정답 확인` 버튼 수정 
- Selectmovie.js: `오답 노트` 버튼 Header.js로 이동
- Check.js: `다시 풀기`, `확인` 버튼 수정

<br>

#### 🙏 솔직히 사진 없이 이해하기 힘들어서 그냥 같이 올린 보고서 보는 게 나을 듯..합니다요 🙏
#### 😱 테스트 용 Quiz.js, Answer.js 때문에 오답노트 부분 이름이 좀 이상하긴 한데, 수정.. 언젠가 할게요 😱

<br>

#### <추추추추추후에>
- Selectmovie.js: 선택한 영화에 해당하는 문제만 표시

<br>
<br>
<br>

# 23.11.02 변경 사항 (front_back)
  
- #### <.env> 파일 추가: ip 주소 숨김 처리 (테스트)
   &rightarrow; Dictation.js, Topic.js, Substitute.js: fetch 수정
  <br>
  
  ###### ⭐ .env 파일 코드 물어보면 알려줄게요 

- #### Dictation.js, Topic.js, Substitute.js: 정답 확인 기능 추가
  - **Topic.js**: 선택한 선택지 확인 (정답, 오답 확인 X)
  - **Dictation.js**: 정답, 오답 확인
    - (DictationAI로부터 3문장 + 원문) 무작위 순서로 섞어 선택지로 제시
  - **Substitute.js**: 정답, 오답 확인 / 보기로 원문 제시 / summary 추가 (테스트)
    - (비슷한 3문장 + 다른 1문장) 무작위 순서로 섞어 선택지로 제시
 
- #### A_Dictation.js, A_Substitute.js: 상단에 '정답/오답' 문구 표시

<br>


<br>
<br>
<br>

# Capstone-Design

##### ⭐ 201911874 박효정, 202011650 나지현, 202012295 이채혁 ⭐

<br>

- **Front-End**: React
- **Back-End**: Node.js
- **Database**: MySQL
- **AI**: Python, Flask


<br>


