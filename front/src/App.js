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

  return (
    <>
     <div className="background"> 
      {content}
     </div> 
    </>
  );

}

export default App;