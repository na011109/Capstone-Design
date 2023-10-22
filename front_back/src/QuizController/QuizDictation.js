import React, { useState, useEffect } from "react";
import "../App.css";

const Quiz = (props) => {
    const [data, setData] = useState({summary: []})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5000/summarize").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="movievideo">
                    <img src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px', }} />    {/*  영상   */}
                </div>
                <br />
                <br />
                <div className="problem">
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data.summary[0]}</p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data.summary[1]}</p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data.summary[2]}</p>
                        )}
                    </div>
                    <div className="selection">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>{data.summary[3]}</p>
                        )}
                    </div>
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