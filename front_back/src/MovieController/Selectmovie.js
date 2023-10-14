import '../App.css';

function Selectmovie(props) {

  return (
    <>
      <h2>영화를 선택해주세요</h2>
      <br />

      <div className="movie">

      <img  src="/img/insideout.jpg" alt="인사이드아웃" onClick={() => {
       props.setMode("SELECTTYPE");
      }}/>
      <img  src="/img/elemental.jpg" alt="엘리멘탈" onClick={() => {
        props.setMode("SELECTTYPE");
      }}/> 

    </div>

    <br />
    <a href="/logout">로그아웃</a>
    </>
  );



}

export default Selectmovie;