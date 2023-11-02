import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import "../App.css";

const Dictation = (props) => {
    const [data1, setData1] = useState({summary: []})
    const [data2, setData2] = useState({ dictation: [], sample: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [shuffledData, setShuffledData] = useState([]);
    const [sumopen, setSumopen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [incorrectIndex, setIncorrectIndex] = useState(null);


    const summarizeApiUrl = process.env.REACT_APP_SUMMARIZE_API;
    const dictationApiUrl = process.env.REACT_APP_DICTATION_API;


    useEffect(() => {
        // 두 개의 fetch 요청을 Promise.all을 사용하여 병렬로 처리
        Promise.all([
            fetch(summarizeApiUrl).then((res) => res.json()),
            fetch(dictationApiUrl).then((res) => res.json())
        ])
        .then(([summaryData, dictationData]) => {
            // 데이터를 받아온 후 빈 데이터 필터링
            const filteredSummaryData = summaryData.summary.filter(item => item.trim() !== '');
            // 마침표 추가
            const summaryWithPeriods = filteredSummaryData.map((sentence) => sentence + ".");

            setData1({ summary: summaryWithPeriods });
            setData2({ 
                dictation: dictationData.dictation,
                sample: dictationData.sample
            });
            console.log(summaryWithPeriods);
            console.log(dictationData.dictation);

            // 데이터를 합친 후 섞기
            const shuffled = shuffleData([
                ...dictationData.dictation,
                dictationData.sample,
            ]);
            setShuffledData(shuffled);

            // sample의 인덱스 저장
            const incorrectIndex = shuffled.indexOf(dictationData.sample);
            setIncorrectIndex(incorrectIndex);
            console.log(incorrectIndex)

            setIsLoading(false);
        });
    }, []);

    const shuffleData = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const moveAnswer = () => {
        if (selectedIndex !== null) {
            props.setMode("A_DICTATION");
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
                        shuffledData.map((item, index) => (
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
        
    )
}

export default Dictation;