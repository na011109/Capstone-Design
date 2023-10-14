import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

import Login from "./UserController/Login.js";
import Signin from "./UserController/Signin.js";
import Quiz from "./QuizController/Quiz.js";
import Selectmovie from './MovieController/Selectmovie';
import Selecttype from './MovieController/Selecttype';

function App() {
  const [mode, setMode] = useState(""); //mode 상태 정의

  useEffect(() => { //로그인이 되어있으면 HOME, 안 되어있으면 LOGIN 페이지로 이동
    fetch("http://localhost:3000/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          setMode("SELECTMOVIE");
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []); 

  let content = null;  

  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }
  else if (mode === 'SELECTMOVIE') {
    content = <Selectmovie setMode={setMode}></Selectmovie>
  }
  else if (mode === 'SELECTTYPE') {
    content = <Selecttype setMode={setMode}></Selecttype>
  }
  else if (mode === 'QUIZ') {
    content = <Quiz setMode={setMode}></Quiz> 
  }


  const modeToClass = {
    LOGIN: 'login-signin',
    SIGNIN: 'login-signin',
    SELECTMOVIE: 'selectmovie'
  };
  
  const modeClass = modeToClass[mode] || 'background';
  
  return (
    <div className={modeClass}>
      {content}
    </div>
  );

}

export default App;









/* 

import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {Routes, Route, NavLink} from "react-router-dom";

import Header from "./Header";
import Login from "./UserController/Login.js";
import Signin from "./UserController/Signin.js";
import Quiz from "./QuizController/Quiz.js";

function App() {
  const [mode, setMode] = useState(""); //mode 상태 정의

  useEffect(() => { //로그인이 되어있으면 HOME, 안 되어있으면 LOGIN 페이지로 이동
    fetch("http://localhost:3000/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          setMode("HOME");
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []); 

  let content = null;  

  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }
  else if (mode === 'HOME') {
    content = <>
    <br />
    <Header />
    <h2>메인 페이지에 오신 것을 환영합니다</h2>
    <p>영화를 선택해주세요.</p> 

    <div className="movie">

      <NavLink to={"/quiz"}>
        <img  src="/img/insideout.jpg" alt="인사이드아웃" />
      </NavLink>
      <NavLink to={"/quiz"}>
        <img  src="/img/elemental.jpg" alt="엘리멘탈" />   
      </NavLink>

      <br />
      <a href="/logout">로그아웃</a>   
    
    </div>
    </>
  }

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>

     <div className="background"> 
      {content}
     </div> 
    </>
  );



}

export default App;









import React from "react";
import {Routes, Route, Link} from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Signin from "./pages/Signin.js";
import Movieselect from "./pages/Movieselect.js";
import Quiz from "./pages/Quiz.js";

function App() {
  return (    
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/movieselect" element={<Movieselect />} />
          <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div> 
      
  );
};



export default App;



*/