import React, { useState, useEffect } from "react";
import "../App.css";

const Quiz = (props) => {
    const [data1, setData1] = useState({ summary: [] });
    const [data2, setData2] = useState({ dictation: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 두 개의 fetch 요청을 Promise.all을 사용하여 병렬로 처리
        Promise.all([
            fetch("http://localhost:5000/summarize").then((res) => res.json()),
            fetch("http://localhost:5000/get_dictation").then((res) => res.json())
        ])
        .then(([summaryData, dictationData]) => {
            // 데이터를 받아온 후 빈 데이터 필터링
            const filteredSummaryData = summaryData.summary.filter(item => item.trim() !== '');

            setData1({ summary: filteredSummaryData });
            setData2({ dictation: dictationData.dictation });
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="movievideo">
                    <img src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px' }} />    {/*  영상   */}
                </div>
                <br />
                <br />
<<<<<<< Updated upstream
                <div className="problem">
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>
                                {data1.summary.map((sentence, index) => (
                                    <span key={index}>
                                        {sentence}
                                        {index !== data1.summary.length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data1.summary[0]}</p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data1.summary[1]}</p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data1.summary[2]}</p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data2.dictation}</p>
                        )}
                    </div>
                </div>
=======
                
>>>>>>> Stashed changes
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
