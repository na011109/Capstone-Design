import '../App.css';
import Header from "../Header";

function Selecttype(props) {

  return (
    <>
    <Header />
      <h2>문제 선택 페이지입니다.</h2>
      <p>문제 유형을 선택해주세요.</p> 

        <div className="quiz">

            <div className="quiztype">
                <div className="type" onClick={() => { props.setMode("QUIZ"); }}>
                    받아쓰기
                </div>
                <div className="type" onClick={() => { props.setMode("QUIZ"); }}>
                    키워드 찾기
                </div>
                <div className="type" onClick={() => { props.setMode("QUIZ"); }}>
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