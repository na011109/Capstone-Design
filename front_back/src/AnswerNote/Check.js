import React, { useState, useEffect } from "react";
import "../App.css";

const Check = (props) => {
    const { id, problem, options, selectedIndex, answerIndex, reselectedIndex } = props;
    const [showAnswer, setShowAnswer] = useState(false);
    const [showIndex, setShowIndex] = useState(false);

    // 정답일 시, id에 해당하는 tuple 삭제
    useEffect(() => {
        if (answerIndex === reselectedIndex) {
            fetch(`http://localhost:3000/deleteProblem/${id}`, {
                method: 'delete',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        }
    }, [answerIndex, reselectedIndex, id]);

    return (
        <div>
            <div className="quiz">
                {reselectedIndex === answerIndex ? (
                    <h2 style={{ color: "blue" }}>정답</h2>
                ) : (
                    <h2 style={{ color: "red" }}>오답</h2>
                )}
                <br />

                <div className="question" style={{ display: problem ? 'block' : 'none' }}>
                    {problem && problem.length > 0 && ( 
                        <p>{problem}</p>
                    )}
                </div>
                {problem && problem.length > 0 && <br />}

                <div className="problem">
                    {options.map((item, index) => (
                        <div className="answer" key={index}>
                            <p
                                style={{
                                    color:
                                        answerIndex === reselectedIndex && index === reselectedIndex
                                            ? "blue" // 정답
                                            : reselectedIndex !== answerIndex && index === reselectedIndex
                                            ? "red" // 오답
                                            : "black",
                                }}
                            >
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            
            {answerIndex !== reselectedIndex && (
                <p className="show_index" onClick={() => setShowAnswer(!showAnswer)} style={{ color: 'blue' }}>
                    {showAnswer ? `(${answerIndex + 1}) ${options[answerIndex]}` : "정답 확인"}
                </p>
            )}

            <p className="show_index" onClick={() => setShowIndex(!showIndex)}>
                {showIndex ? `(${selectedIndex + 1}) ${options[selectedIndex]}` : "이전에 선택한 선택지"}
            </p>
            <br />

            <div className="button-container">
                {answerIndex !== reselectedIndex && (
                    <button
                        onClick={() => {
                            console.log("sentId: ", id);

                            props.setMode("PROBLEM");
                            props.setIndex({
                                selectedId: id,
                            });
                        }}
                    >
                        다시 풀기
                    </button>
                )} 

                <button onClick={() => { props.setMode("LIST"); }}>확인</button>
            </div>
        </div>
    );
}

export default Check;
