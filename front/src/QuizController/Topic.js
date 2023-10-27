import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import "../App.css";

const Topic = (props) => {
    const [data, setData] = useState({summary: []})
    const [sumopen, setSumopen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5000/get_topic")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
            });
    }, []);
    
    return (
    <div>
        <div className="quiz">
            <div className="movievideo" style={{display: "flex"}}>
                <img  src="/img/insideout.jpg" alt="인사이드아웃" style={{ width: '800px', height: '450px',}} />    {/*  영상   */}
                <img src="/img/search.png" alt="요약" style={{width: '50px', height:'50px', }} onClick={()=> setSumopen(true)}/>
                    <Modal className="summary" isOpen={sumopen} onRequestClose={() => setSumopen(false)}>
                        <p style={{fontSize: "20pt" }}> 요  약</p>
                        <br /> <br /> <br />
                    </Modal>
            </div>
            <br />
            <div className="problem">
            <div className="selection">
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
        </div>
    </div>  
        
    )
}

export default Topic;