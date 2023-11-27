import React, { useEffect, useState } from 'react';
import "../App.css";

const Problem = (props) => {
  const { selectedId } = props;
  const [data, setData] = useState({});
  const [reselectedIndex, setreselectedIndex] = useState(null);

  useEffect(() => {
    console.log("selectedId:", selectedId);

    fetch(`http://localhost:3000/getProblem/${selectedId}`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
  }, [selectedId]);

  const moveAnswer = () => {
    if (reselectedIndex !== null) {
        props.setMode("CHECK");
        props.setAnswerData({
            id: selectedId,
            problem: data.problem,
            options: data.options,
            selectedIndex: data.selectedIndex,
            answerIndex: data.answerIndex,
            reselectedIndex: reselectedIndex,
        });
    } else {
        // 선택하지 않았을 때 메시지 표시
        window.alert("정답을 선택해주세요!");
    }
};

  return (
    <div>
      <div className="quiz">
        <div className="movievideo" style={{ display: "flex" }}>
          <img src="/img/insideout_2.jpg" alt="인사이드아웃" style={{ width: '700px', height: '392px' }} />    {/*  영상   */}
        </div>
        <br />
        <br />

        <div className="question" style={{ display: data.problem ? 'block' : 'none' }}>
          {data.problem && data.problem.length > 0 && ( 
            <p>{data.problem}</p>
          )}
        </div>
        {data.problem && data.problem.length > 0 && <br />}

        <div className="problem">
          {data.options && data.options.map((item, index) => (
            <div
              className={`selection ${reselectedIndex === index ? "selected" : ""}`}
              key={index}
              onClick={() => setreselectedIndex(index)}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <div className="button-container">
        <button onClick={moveAnswer}>정답 확인</button>
      </div>
    </div>
  );
};

export default Problem;
