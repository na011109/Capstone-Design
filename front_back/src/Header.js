import React, { useState } from "react";
import { useEffect } from 'react';
import './App.css';


const Header = (props) => {
    const [showbtn, setShowbtn] = useState(false);  //로그아웃 활성화
    const [visible, setVisible] = useState(false);  //선택 버튼 활성화
    const [username, setUsername] = useState("");  // 사용자 이름 저장

    useEffect(() => {
        goin();
    }, []);
    
    useEffect(() => { //버튼 활성화    
        if (props.mode !== 'LOGIN' && props.mode !== 'SIGNIN') {
            setShowbtn(true);
        }
        else{
            setShowbtn(false);
        }
        if (props.mode === 'DICTATION' || props.mode === 'SUBSTITUTE' || props.mode === 'TOPIC' || props.mode === 'A_DICTATION' || props.mode === 'A_SUBSTITUTE' || props.mode === 'A_TOPIC' || props.mode === 'QUIZ' ) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [props.mode]);

    const goin = () => {
        fetch("http://localhost:3000/authcheck")
          .then((res) => res.json())
          .then((json) => {
            if (json.isLogin === "True") {
              props.setMode("SELECTMOVIE");
              setUsername(json.username); // 사용자 이름을 상태에 저장
              console.log(json.username);
            } else {
              props.setMode("LOGIN");
            }
          });
      };
      

    return (
        <div> 
            <div className="header">
                <div className="he_ho" onClick={goin}>
                    <h1 style={{margin: 0, marginTop: 5}}>SEWM</h1>
                    <p style={{color: 'gray', margin: 0}}> Study English With Movie </p>
                </div>                 
                {showbtn && <div className="link_contain" >
                    <p style={{ paddingRight: "20px", fontSize: "14pt", fontWeight: "bold"}}>
                        {username && `${username}`} {/* 사용자 이름 표시 */}
                    </p>
                    <a href="/logout"  className="log_link">로그아웃</a>
                </div> }                               
                <hr style={{width: '80%', color: 'darkgray',}}/>
                {visible && <div className="toggle">
                    <button className="btn_select" onClick={() => { props.setMode("SELECTMOVIE"); }}>영화 선택하기</button> 
                    <button className="btn_select" onClick={() => { props.setMode("SELECTTYPE"); }}>문제 유형 선택하기</button>          
                </div>}
                {props.mode === 'PROBLEM' && <div className="toggle">
                    <button className="btn_select" onClick={() => { props.setMode("LIST"); }}>오답노트 리스트</button>       
                </div>}
            </div>            
        </div>
     
    );
};

export default Header;