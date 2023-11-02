import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css";

const Quiz = (props) => {
    const [data1, setData1] = useState({summary: []})
    const [data2, setData2] = useState({ dictation: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [sumopen, setSumopen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 항목의 인덱스 추가


    useEffect(() => {
        // 두 개의 fetch 요청을 Promise.all을 사용하여 병렬로 처리
        Promise.all([
            fetch("http://localhost:5000/summarize").then((res) => res.json()),
            fetch("http://localhost:5000/get_dictation").then((res) => res.json())
        ])
        .then(([summaryData, dictationData]) => {
            // 데이터를 받아온 후 빈 데이터 필터링
            const filteredSummaryData = summaryData.summary.filter(item => item.trim() !== '');
            // 마침표 추가
            const summaryWithPeriods = filteredSummaryData.map((sentence) => sentence + ".");

            setData1({ summary: summaryWithPeriods });
            setData2({ dictation: dictationData.dictation });
            console.log(summaryWithPeriods);
            console.log(dictationData.dictation);
            setIsLoading(false);
        });
    }, []);

    const moveAnswer = () => {
        if (selectedIndex !== null) {
            props.setMode("ANSWER");
            props.setAnswerData({
                summary: data1.summary,
                selectedIndex,
            });
        } else {
            // 선택하지 않았을 때 메시지 표시
            window.alert("정답을 선택해주세요!");
        }
    };

    return (
        <div>
            <div className="quiz">
                <div className="movievideo" style={{display: "flex"}}>
                    <img  src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px',}} />    {/*  영상   */}
                    <img src="/img/search.png" alt="요약" style={{width: '50px', height:'50px', }} onClick={()=> setSumopen(true)}/>
                        <Modal className="summary" isOpen={sumopen} onRequestClose={() => setSumopen(false)}>
                        <p style={{ textAlign: "center", fontSize: "20pt", fontWeight: "bold" }}>Summary</p>
                            <div>
                                {isLoading ? (
                                    <p style={{fontSize: "15pt" }} >Loading...</p>
                                ) : (
                                    <p style={{fontSize: "15pt" }}>
                                        {data1.summary.map((sentence, index) => (
                                            <span key={index}>
                                                {sentence}
                                                {index !== data1.summary.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        </Modal>
                </div>

                <br />
                <br />
                <div className="problem">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        data1.summary.map((item, index) => (
                            <div
                                className={`selection ${selectedIndex === index ? "selected" : ""}`}
                                key={index}
                                onClick={() => setSelectedIndex(index)} // 항목을 선택할 때 인덱스 업데이트
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

export default Quiz;
