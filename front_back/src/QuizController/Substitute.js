import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import "../App.css";

const Substitute = (props) => {
    const [data1, setData1] = useState({ correct: [] });
    const [data2, setData2] = useState({ incorrect: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [shuffledData, setShuffledData] = useState([]);
    const [sumopen, setSumopen] = useState(false);

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

    // 데이터가 모두 로드되면 데이터를 섞음
    useEffect(() => {
        if (data1.correct.length > 0 && data2.incorrect.length > 0) {
            const shuffled = shuffleData(data1.correct, data2.incorrect);
            setShuffledData(shuffled);
            setIsLoading(false);
        }
    }, [data1.correct, data2.incorrect]);

    // 배열을 무작위로 섞는 함수
    const shuffleData = (correctData, incorrectData) => {
        const shuffled = [];

        // correctData 모두 추가
        shuffled.push(...correctData);

        // incorrectData 중 무작위로 1개 추가
        const randomIncorrectIndex = Math.floor(Math.random() * incorrectData.length);
        shuffled.push(incorrectData[randomIncorrectIndex]);

        // 배열을 무작위로 섞음
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    };

    
    return (
    <div>
        <div className="quiz">
            <div className="movievideo" style={{display: "flex"}}>
                <img  src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px',}} />    {/*  영상   */}
                <img src="/img/search.png" alt="요약" style={{width: '50px', height:'50px', }} onClick={()=> setSumopen(true)}/>
                    <Modal className="summary" isOpen={sumopen} onRequestClose={() => setSumopen(false)}>
                    <p style={{ textAlign: "center", fontSize: "20pt", fontWeight: "bold" }}>Summary</p>
                        <br />
                    </Modal>
            </div>
            <br />
            <div className="problem">
            <div className="selection">
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
        </div>
        <br />
        <br />
    </div>  
        
    )
}

export default Substitute;