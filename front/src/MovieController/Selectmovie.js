import '../App.css';

function Selectmovie(props) {

  return (
    <>
      <h2 style={{margin: 0}}>메인 페이지에 오신 것을 환영합니다</h2>
      <p>영화를 선택해주세요.</p> 

      <div className="movie">       
        <img className="movieimg" src="/img/insideout.jpg" alt="인사이드아웃" onClick={() => {   
          props.setMode("SELECTTYPE");  }} />
        <img className="movieimg" src="/img/elemental.jpg" alt="엘리멘탈" onClick={() => {
          props.setMode("SELECTTYPE");
        }}/> 
      </div>
     </>
  );
}

export default Selectmovie;