import '../App.css';
import { useState } from 'react';

function Signin(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
  
    return <>
    <br />
      <h2>회원가입</h2>
  
      <div className="form">
        <p><input className="login" type="text" placeholder="아이디" onChange={event => {
          setId(event.target.value);
        }} /></p>
        <p><input className="login" type="password" placeholder="비밀번호" onChange={event => {
          setPassword(event.target.value);
        }} /></p>
        <p><input className="login" type="password" placeholder="비밀번호 확인" onChange={event => {
          setPassword2(event.target.value);
        }} /></p>
  
        <p><input className="btn_sub" type="submit" value="회원가입" onClick={() => {
          const userData = {
            userId: id,
            userPassword: password,
            userPassword2: password2,
          };
          fetch("http://localhost:3000/signin", { //signin 주소에서 받을 예정
            method: "post", // method :통신방법
            headers: {      // headers: API 응답에 대한 정보를 담음
              "content-type": "application/json",
            },
            body: JSON.stringify(userData), //userData라는 객체를 보냄
          })
            .then((res) => res.json())
            .then((json) => {
              if(json.isSuccess==="True"){
                alert('회원가입이 완료되었습니다!')
                props.setMode("LOGIN");
              }
              else{
                alert(json.isSuccess)
              }
            });
        }} /></p>
      </div>
  
      <p style={{height: '50px'}}>로그인화면으로 돌아가기  
        <button className="btn_form" onClick={() => { props.setMode("LOGIN"); }}>로그인</button>
      </p>
    </> 
  }
  export default Signin;