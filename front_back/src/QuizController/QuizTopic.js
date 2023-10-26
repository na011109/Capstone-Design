import React, { useState, useEffect } from "react";
import "../App.css";

const Quiz = (props) => {
    const [data, setData] = useState({ topic: [] })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5000/get_topic")
            .then((res) => res.json())
            .then((data) => {
                // 데이터를 받아온 후 빈 데이터 필터링
                const filteredData = data.topic.filter((item) => item.trim() !== "")
                setData({ topic: filteredData })
                setIsLoading(false)
            });
    }, []);

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="movievideo">
                    <img
                        src="/img/insideout.jpg"
                        alt="인사이드아웃"
                        style={{ width: "800px", height: "450px" }}
                    />
                </div>
                <br />
                <br />
                <div className="problem">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        data.topic.map((item, index) => (
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
};

export default Quiz;
