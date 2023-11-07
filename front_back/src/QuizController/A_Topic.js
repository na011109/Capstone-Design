import React from "react";

const A_Topic = (props) => {
    const { topic, selectedIndex } = props;

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="problem">
                    {topic.map((item, index) => (
                        <div className="answer" key={index}>
                            <p
                                style={{
                                    color: index === selectedIndex ? "red" : "black",
                                }}
                            >
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className="button-container">
                <button
                    onClick={() => {
                        // props.setAnswerData({
                        //     topic: [],
                        //     selectedIndex: null,
                        // });
                        props.setMode("TOPIC");
                    }}
                >
                    다음 문제
                </button>
            </div>
        </div>
    );
}

export default A_Topic;
