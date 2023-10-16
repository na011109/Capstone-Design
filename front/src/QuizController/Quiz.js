import React from "react";
import "../App.css";
import Header from "../Header";

const Quiz = (props) => {
    
    return (
    <div>
        <Header />
        <div className="quiz">
            <div className="movievideo">
                <img  src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px',}} />    {/*  영상   */}
            </div>
            <br />
            <div className="problem">
                <div className="selection">
                    문제1
                </div>
                <div className="selection">
                    문제2
                </div>
                <div className="selection">
                    문제3
                </div>
                <div className="selection" > 
                    문제4
                </div>
            </div>
        </div>
        <button onClick={() => { props.setMode("SELECTMOVIE"); }}>영화 선택하기</button>
        <button onClick={() => { props.setMode("SELECTTYPE"); }}>문제 유형 선택하기</button>

    </div>  
        
    )
}

export default Quiz;