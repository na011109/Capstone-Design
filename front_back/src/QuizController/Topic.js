import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import "../App.css";

const Topic = (props) => {
    const [data1, setData1] = useState({summary: []})
    const [data2, setData2] = useState({ topic: [] });
    const [sumopen, setSumopen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 항목의 인덱스 추가


    const summarizeApiUrl = process.env.REACT_APP_SUMMARIZE_API;
    const topicApiUrl = process.env.REACT_APP_TOPIC_API;

    useEffect(() => {
        // 두 개의 fetch 요청을 Promise.all을 사용하여 병렬로 처리
        Promise.all([
            fetch(summarizeApiUrl).then((res) => res.json()),
            fetch(topicApiUrl).then((res) => res.json())
        ])
        .then(([summaryData, topicData]) => {
            // 데이터를 받아온 후 빈 데이터 필터링
            const filteredSummaryData = summaryData.summary.filter(item => item.trim() !== '');
            // 마침표 추가
            const summaryWithPeriods = filteredSummaryData.map((sentence) => sentence + ".");

            setData1({ summary: summaryWithPeriods });
            setData2({ topic: topicData.topic });
            console.log(summaryWithPeriods);
            console.log(topicData.topic);
            setIsLoading(false);
        });
    }, []);

    const moveAnswer = () => {
        if (selectedIndex !== null) {
            props.setMode("A_TOPIC");
            props.setAnswerData({
                topic: data2.topic,
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
                <img  src="/img/insideout_2.jpg" alt="인사이드아웃" style={{ width: '700px', height: '392px',}} />    {/*  영상   */}
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
                    data2.topic && data2.topic.length > 0 ? (
                        data2.topic.map((item, index) => (
                            <div
                                className={`selection ${selectedIndex === index ? "selected" : ""}`}
                                key={index}
                                onClick={() => setSelectedIndex(index)} // 항목을 선택할 때 인덱스 업데이트
                            >
                                <p>{item}</p>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )
                )}
            </div>
        </div>

        <br />
        <br />
        <div className="button-container">
            <button onClick={moveAnswer}>정답 확인</button>
        </div>
    </div>  
        
    )
}

export default Topic;