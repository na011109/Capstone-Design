import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css";

const Substitute = (props) => {
    const [data1, setData1] = useState({ correct: [], sample: [] });
    const [data2, setData2] = useState({ incorrect: [] });
    const [data3, setData3] = useState({ summary: [] })
    const [isLoading, setIsLoading] = useState(true);
    const [shuffledData, setShuffledData] = useState([]);
    const [sumopen, setSumopen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [incorrectIndex, setIncorrectIndex] = useState(null);

    const summarizeApiUrl = process.env.REACT_APP_SUMMARIZE_API;
    const correctApiUrl = process.env.REACT_APP_CORRECT_API;
    const incorrectApiUrl = process.env.REACT_APP_INCORRECT_API;

    useEffect(() => {
        // correct 데이터 가져오기
        fetch(correctApiUrl)
            .then((res) => res.json())
            .then((data) => {
                setData1({
                    correct: data.correct,
                    sample: data.sample
                })
                console.log(data.sample);
            });
    }, []);

    useEffect(() => {
        // incorrect 데이터 가져오기
        fetch(incorrectApiUrl)
            .then((res) => res.json())
            .then((data) => {
                setData2(data);
            });
    }, []);

    useEffect(() => {
        // summarize
        fetch(summarizeApiUrl)
            .then((res) => res.json())
            .then((data) => {
                setData3(data)
                console.log(data);
            });
    }, []);

    useEffect(() => {
        if (data1.correct.length > 0 && data2.incorrect.length === 3 && data3.summary.length > 0) {
            const { shuffled, incorrectIndex } = shuffleData(data1.correct, data2.incorrect[0]);
            setShuffledData(shuffled);

            setIncorrectIndex(incorrectIndex);
            console.log(incorrectIndex);

            setIsLoading(false);
        }
    }, [data1.correct, data2.incorrect, data3.summary]);

    const shuffleData = (correctData, incorrectData) => {
        const shuffled = [...correctData, incorrectData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // incorrectData가 shuffled 배열에서 몇 번째 인덱스에 있는지 찾음
        const incorrectIndex = shuffled.indexOf(incorrectData);

        return { shuffled, incorrectIndex };
    };

    const moveAnswer = () => {
        if (selectedIndex !== null) {
            props.setMode("A_SUBSTITUTE");
            props.setAnswerData({
                shuffledData: shuffledData,
                selectedIndex,
                incorrectIndex,
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
                    <img src="/img/search.png" alt="요약" style={{ width: '50px', height: '50px' }} onClick={() => setSumopen(true)} />
                    <Modal className="summary" isOpen={sumopen} onRequestClose={() => setSumopen(false)}>
                    <p style={{ textAlign: "center", fontSize: "20pt", fontWeight: "bold" }}>Summary</p>
                        <div>
                            {isLoading ? (
                                <p style={{fontSize: "15pt" }} >Loading...</p>
                            ) : (
                                <p style={{fontSize: "15pt" }}>
                                    {data3.summary.map((sentence, index) => (
                                        <span key={index}>
                                            {sentence}
                                            {index !== data3.summary.length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            )}
                        </div>
                    </Modal>
                </div>
                <br />
                <br />

                <div className="question">
                    {data1.sample && data1.sample.length > 0 && ( 
                        <div>
                            <p>{data1.sample}</p>
                        </div>
                    )}
                </div>

                <br />
                <div className="problem">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        shuffledData.map((item, index) => (
                            <div
                                className={`selection ${selectedIndex === index ? "selected" : ""}`}
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <p>{item}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <br />
            <br />
            <div className="button-container">
                <button onClick={moveAnswer}>정답 확인</button>
            </div>
        </div>
    );
}

export default Substitute;
