import React from "react";

const Answer = (props) => {
    const { summary, selectedIndex } = props;

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="problem">
                    {summary.map((item, index) => (
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
                        props.setAnswerData({
                            summary: [],
                            selectedIndex: null,
                        });
                        props.setMode("QUIZ");
                    }}
                >
                    다음 문제
                </button>
            </div>
        </div>
    );
}

export default Answer;
