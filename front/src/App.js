import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

import Header from './Header';
import Login from "./UserController/Login.js";
import Signin from "./UserController/Signin.js";
import Topic from "./QuizController/Topic.js";
import Dictation from "./QuizController/Dictation.js";
import Substitute from "./QuizController/Substitute.js";
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
    else if (mode === 'DICTATION') {
    content = <Dictation setMode={setMode}></Dictation> 
  }
  else if (mode === 'SUBSTITUTE') {
    content = <Substitute setMode={setMode}></Substitute> 
  }
  else if (mode === 'TOPIC') {
    content = <Topic setMode={setMode}></Topic> 
  }



  // const modeToClass = {
  //   LOGIN: 'login-signin',
  //   SIGNIN: 'login-signin',
  //   SELECTMOVIE: 'selectmovie'
  // };
  
  // const modeClass = modeToClass[mode] || 'background';
  
  // return (
  //   <div className={modeClass}>
  //     {content}
  //   </div>
  // );


  return (
    <>
    <Header mode={mode} setMode={setMode} />
     <div className="background">   
      {content}
     </div> 
    </>
  );

}

export default App;