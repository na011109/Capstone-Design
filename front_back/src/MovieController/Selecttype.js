import '../App.css';

function Selecttype(props) {

  return (
    <>
      <h2>문제 유형을 선택해주세요</h2>
      <br />
      <br />

        <div className="quiz">

            <div className="quiztype">
                <div className="type" onClick={() => { props.setMode("QUIZ_DIC"); }}>
                    받아쓰기
                </div>
                <div className="type" onClick={() => { props.setMode("QUIZ_TOPIC"); }}>
                    키워드 찾기
                </div>
                <div className="type" onClick={() => { props.setMode("QUIZ_SUB"); }}>
                    대치
                </div>
            </div>
        </div>

      <br />
      <button onClick={() => {
        props.setMode("SELECTMOVIE");
        }}>영화 선택 화면</button>  
    
    
    </>
  );



}

export default Selecttype;