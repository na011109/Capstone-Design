import React, { useState, useEffect } from "react";
import "../App.css";

const A_Dictation = (props) => {
    const { shuffledData, selectedIndex, answerIndex } = props;

    useEffect(() => {
        if (selectedIndex != answerIndex) {
            saveAnswer();
        }
    }, []);

    // username 처리 => /answernote 엔드포인트에서
    const saveAnswer = () => {
        const userData = {
            options: shuffledData,
            selectedIndex: selectedIndex,
            answerIndex: answerIndex
        };
        fetch("http://localhost:3000/answernote", { 
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
    };


    return (
        <div>
            <div className="quiz">
                {selectedIndex === answerIndex ? (
                    <h2 style={{ color: "blue" }}>정답</h2>
                ) : (
                    <h2 style={{ color: "red" }}>오답</h2>
                )}
                <br />
                <div className="problem">
                    {shuffledData.map((item, index) => (
                        <div className="answer" key={index}>
                            <p
                                style={{
                                    color: index === answerIndex ? "blue" : index === selectedIndex ? "red" : "black",
                                }}
                            >
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className="button-container">
                <button
                    onClick={() => {
                        // props.setAnswerData({
                        //     dictation: [],
                        //     selectedIndex: null,
                        //     answerIndex: null,
                        // });

                        props.setMode("DICTATION");
                    }}
                >
                    다음 문제
                </button>
            </div>
        </div>
    );
}

export default A_Dictation;