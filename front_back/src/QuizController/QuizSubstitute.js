import React, { useState, useEffect } from "react";
import "../App.css";

const Quiz = (props) => {
    const [data1, setData1] = useState({ correct: [] });
    const [data2, setData2] = useState({ incorrect: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [shuffledData, setShuffledData] = useState([]);

    useEffect(() => {
        // correct 데이터 가져오기
        fetch("http://localhost:5000/correct_sentences")
            .then((res) => res.json())
            .then((data) => {
                setData1(data);
            });
    }, []);

    useEffect(() => {
        // incorrect 데이터 가져오기
        fetch("http://localhost:5000/incorrect_sentences")
            .then((res) => res.json())
            .then((data) => {
                setData2(data);
            });
    }, []);

    // 데이터가 업데이트되면 데이터를 섞음
    useEffect(() => {
        if (data1.correct.length > 0 && data2.incorrect.length > 0) {
            const shuffled = shuffleData(data1.correct, data2.incorrect);
            setShuffledData(shuffled);
            setIsLoading(false);
        }
    }, [data1, data2]);

    // 배열을 무작위로 섞는 함수
    const shuffleData = (correctData, incorrectData) => {
        const shuffled = [];
        // 세 개의 항목은 data1에서 가져오기
        for (let i = 0; i < 3; i++) {
            shuffled.push(correctData[i]);
        }
        // 한 개의 항목은 data2에서 가져오기
        shuffled.push(incorrectData[0]);
        // 나머지 항목을 섞음
        const restCorrectData = correctData.slice(3);
        const restIncorrectData = incorrectData.slice(1);

        const allData = [...restCorrectData, ...restIncorrectData];
        for (let i = allData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allData[i], allData[j]] = [allData[j], allData[i]];
        }
        shuffled.push(...allData);

        return shuffled;
    };

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="movievideo">
                    <img src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px', }} />
                </div>
                <br />
                <br />
                <div className="problem">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        shuffledData.map((item, index) => (
                            <div className="selection" key={index}>
                                <p>{item}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <br />
            <div className="button-container">
                <button onClick={() => { props.setMode("SELECTMOVIE"); }}>영화 선택하기</button>
                <button onClick={() => { props.setMode("SELECTTYPE"); }}>문제 유형 선택하기</button>
            </div>
        </div>
    );
}

export default Quiz;
