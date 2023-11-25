import React, { useEffect, useState } from 'react';
import "../App.css";

const Problem = (props) => {
  const { selectedId } = props;
  const [data, setData] = useState({});

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

  return (
    <div>
      <div className="quiz">
        <div className="problem">
          <p>Problem: {data.problem}</p>
          <p>Options:</p>
          <ul>
            {data.options && data.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          <p>Selected Index: {data.selectedIndex}</p>
          <p>Answer Index: {data.answerIndex}</p>
          <p>Timestamp: {data.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default Problem;
