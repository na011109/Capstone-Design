import '../App.css';
import Header from "../Header";

function Selectmovie(props) {

  return (
    <>
    <Header />
      <h2>메인 페이지에 오신 것을 환영합니다</h2>
      <p>영화를 선택해주세요.</p> 

      <div className="movie">

      <img  src="/img/insideout.jpg" alt="인사이드아웃" onClick={() => {
       props.setMode("SELECTTYPE");
      }}/>
      <img  src="/img/elemental.jpg" alt="엘리멘탈" onClick={() => {
        props.setMode("SELECTTYPE");
      }}/> 


      <br />
      <a href="/logout">로그아웃</a>   
    
    </div>
    </>
  );



}

export default Selectmovie;