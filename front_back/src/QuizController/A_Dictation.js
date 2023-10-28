import React from "react";

const A_Dictation = (props) => {
    const { dictation } = props;

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="problem">
                    <div className="answer">
                        <p>{dictation}</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="button-container">
                <button
                    onClick={() => {
                        props.setAnswerData({
                            dictation: [],
                        });
                        props.setMode("DICTATION");
                    }}
                >
                    다음 문제
                </button>
            </div>
        </div>
    );
}

export default A_Dictation;
