import React, { useState } from "react";
import { useEffect } from 'react';
import './App.css';


const Header = (props) => {
    const [showbtn, setShowbtn] = useState(false);  //로그아웃 활성화
    const [visible, setVisible] = useState(false);  //선택 버튼 활성화

    useEffect(() => { //버튼 활성화     
        if (props.mode !== 'LOGIN' && props.mode !== 'SIGNIN') {
            setShowbtn(true);
        }
        else{
            setShowbtn(false);
        }
        if (props.mode === 'DICTATION' || props.mode === 'SUBSTITUTE' || props.mode === 'TOPIC') {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [props.mode]);

    const goin = () => { //로그인이 되어있으면 HOME, 안 되어있으면 LOGIN 페이지로 이동
        fetch("http://localhost:3000/authcheck")
          .then((res) => res.json())
          .then((json) => {        
            if (json.isLogin === "True") {
              props.setMode("SELECTMOVIE");
            }
            else {
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
                    <p style={{paddingRight: "20px", fontSize: "14pt"}}> 사용자 </p>  {/* db에서 사용자 이름 가져오기   */} 
                    <a href="/logout"  className="log_link">로그아웃</a>
                </div> }                               
                <hr style={{width: '80%', color: 'darkgray',}}/>
                {visible && <div className="toggle">
                    <button className="btn_select" onClick={() => { props.setMode("SELECTMOVIE"); }}>영화 선택하기</button> 
                    <button className="btn_select" onClick={() => { props.setMode("SELECTTYPE"); }}>문제 유형 선택하기</button>          
                </div>}
            </div>            
        </div>
     
    );
};

export default Header;