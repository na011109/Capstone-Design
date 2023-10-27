import '../App.css';

function Selecttype(props) {

  return (
    <>
      <p style={{margin: 0, fontSize: "15pt"}}>
        문제 유형을 선택해주세요.
      </p> <br />

      <div className="quiz">
        <div className="quiztype">
          <div className="type" onClick={() => { props.setMode("DICTATION"); }}>
            받아쓰기
          </div>
          <div className="type" onClick={() => { props.setMode("TOPIC"); }}>
            키워드 찾기
          </div>
          <div className="type" onClick={() => { props.setMode("SUBSTITUTE"); }}>
            대치
          </div>
        </div>
      </div> 
    </>
  );

}

export default Selecttype;