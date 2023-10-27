import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import "../App.css";

const Dictation = (props) => {
    const [data1, setData1] = useState({summary: []})
    const [data2, setData2] = useState({ dictation: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [sumopen, setSumopen] = useState(false);

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
            <div className="movievideo" style={{display: "flex"}}>
                <img  src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px',}} />    {/*  영상   */}
                <img src="/img/search.png" alt="요약" style={{width: '50px', height:'50px', }} onClick={()=> setSumopen(true)}/>
                    <Modal className="summary" isOpen={sumopen} onRequestClose={() => setSumopen(false)}>
                        <p style={{fontSize: "20pt", fontWeight: "bold"}}> 요  약</p>
                        <br /> <br /> <br />
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
                                    {data1.summary[0]}
                                    {data1.summary[1]}
                                    {data1.summary[2]}
                                </p>
                            )}
                        </div>
                    </Modal>
            </div>
            
            <br />
            <br />
            <div className="problem">
                <div className="selection">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>{data2.dictation}</p>
                    )}
                </div>
            </div>
        </div>
        <br />
    </div>  
        
    )
}

export default Dictation;