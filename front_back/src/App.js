import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './Header';
import Login from './UserController/Login.js';
import Signin from './UserController/Signin.js';
import Topic from './QuizController/Topic.js';
import Dictation from './QuizController/Dictation.js';
import Substitute from './QuizController/Substitute';
import Selectmovie from './MovieController/Selectmovie';
import Selecttype from './MovieController/Selecttype';
import A_Topic from './QuizController/A_Topic';
import A_Dictation from './QuizController/A_Dictation';
import A_Substitute from './QuizController/A_Substitute';

import Quiz from './checkAnswer_test/Quiz.js';
import Answer from './checkAnswer_test/Answer.js';

import List from './AnswerNote/List.js';
import Problem from './AnswerNote/Problem.js';

function App() {
  const [mode, setMode] = useState('');
  const [answerData, setAnswerData] = useState(null);
  const [indexData, setIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/authcheck')
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === 'True') {
          setMode('SELECTMOVIE');
        } else {
          setMode('LOGIN');
        }
      });
  }, []);

  let content = null;

  if (mode === 'LOGIN') {
    content = <Login setMode={setMode}></Login>;
  } else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin>;
  } else if (mode === 'SELECTMOVIE') {
    content = <Selectmovie setMode={setMode}></Selectmovie>;
  } else if (mode === 'SELECTTYPE') {
    content = <Selecttype setMode={setMode}></Selecttype>;

  } else if (mode === 'TOPIC') {
    content = <Topic setMode={setMode} setAnswerData={setAnswerData}></Topic>;
  } else if (mode === 'DICTATION') {
    content = <Dictation setMode={setMode} setAnswerData={setAnswerData}></Dictation>;
  } else if (mode === 'SUBSTITUTE') {
    content = <Substitute setMode={setMode} setAnswerData={setAnswerData}></Substitute>;

  } else if (mode === 'A_TOPIC' && answerData) {
    content = <A_Topic setMode={setMode} setAnswerData={setAnswerData}
     topic={answerData.topic} selectedIndex={answerData.selectedIndex}></A_Topic>;
  } else if (mode === 'A_DICTATION' && answerData) {
    content = <A_Dictation setMode={setMode} setAnswerData={setAnswerData}
     shuffledData={answerData.shuffledData} selectedIndex={answerData.selectedIndex} answerIndex={answerData.answerIndex}></A_Dictation>;
  } else if (mode === 'A_SUBSTITUTE' && answerData) {
    content = <A_Substitute setMode={setMode} setAnswerData={setAnswerData}
     problem={answerData.problem} shuffledData={answerData.shuffledData} selectedIndex={answerData.selectedIndex} answerIndex={answerData.answerIndex}></A_Substitute>;

     
  } else if (mode === 'QUIZ') {
    content = <Quiz setMode={setMode} setAnswerData={setAnswerData}></Quiz>;
  } else if (mode === 'ANSWER' && answerData) {
    content = <Answer setMode={setMode} setAnswerData={setAnswerData}
     summary={answerData.summary} selectedIndex={answerData.selectedIndex} answerIndex={answerData.answerIndex} ></Answer>;

  } else if (mode === 'LIST') {
    content = <List setMode={setMode} setIndex={setIndex}></List>;
  } else if (mode === 'PROBLEM' && indexData) {
    content = <Problem setMode={setMode} setIndex={setIndex}
    selectedId={indexData.selectedId} ></Problem>;
  }


  // const modeToClass = {
  //   LOGIN: 'login-signin',
  //   SIGNIN: 'login-signin',
  // };
  // const modeClass = modeToClass[mode] || 'background';

  // const renderHeader = mode !== 'LOGIN' && mode !== 'SIGNIN';

  // return (
  //   <>
  //     {renderHeader && <Header mode={mode} setMode={setMode} />}
  //    <div className={modeClass}>   
  //     {content}
  //    </div> 
  //   </>
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
