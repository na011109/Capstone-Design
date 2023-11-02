import '../App.css';

function Selecttype(props) {

  return (
    <>
      <h2 style={{margin: 0}}>문제 유형을 선택해주세요.</h2>
      <br />
      <br />

      <div className="quiz">
        <div className="quiztype">
          <div className="type" onClick={() => { props.setMode("DICTATION"); }}>
            옳은 문장 찾기 (철자)
          </div>
          <div className="type" onClick={() => { props.setMode("TOPIC"); }}>
            키워드 찾기
          </div>
          <div className="type" onClick={() => { props.setMode("SUBSTITUTE"); }}>
            다른 문장 찾기 (의미)
          </div>
          <div className="type" onClick={() => { props.setMode("QUIZ"); }}>
            테스트
          </div>
        </div>
      </div> 
      <br />
      <br />
    </>
  );

}

export default Selecttype;