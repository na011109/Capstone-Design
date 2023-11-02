import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './UserController/Login.js';
import Signin from './UserController/Signin.js';
import QuizTopic from './QuizController/QuizTopic.js';
import QuizDictation from './QuizController/QuizDictation.js';
import QuizSubstitute from './QuizController/QuizSubstitute';
import Selectmovie from './MovieController/Selectmovie';
import Selecttype from './MovieController/Selecttype';
import Quiz from './QuizController/Quiz';
import Answer from './QuizController/Answer'; // Answer 컴포넌트 추가

function App() {
  const [mode, setMode] = useState('');
  const [answerData, setAnswerData] = useState(null);

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
  } else if (mode === 'QUIZ_TOPIC') {
    content = <QuizTopic setMode={setMode}></QuizTopic>;
  } else if (mode === 'QUIZ_DIC') {
    content = <QuizDictation setMode={setMode}></QuizDictation>;
  } else if (mode === 'QUIZ_SUB') {
    content = <QuizSubstitute setMode={setMode}></QuizSubstitute>;
  } else if (mode === 'QUIZ') {
    content = <Quiz setMode={setMode} setAnswerData={setAnswerData}></Quiz>; // setAnswerData 추가
  } else if (mode === 'ANSWER' && answerData) {
    content = <Answer summary={answerData.summary} selectedSummaryIndex={answerData.selectedSummaryIndex} />;
  }

  const modeToClass = {
    LOGIN: 'login-signin',
    SIGNIN: 'login-signin',
    SELECTMOVIE: 'selectmovie',
  };

  const modeClass = modeToClass[mode] || 'background';

  return (
    <div className={modeClass}>
      {content}
    </div>
  );
}

export default App;
