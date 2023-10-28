// 나중에 데이터 이름 바꿔야 됨 (substitute -> ?)

import React from "react";

const A_Substitute = (props) => {
    const { substitute, selectedIndex } = props;

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="problem">
                    {substitute.map((item, index) => (
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
                            substitute: [],
                            selectedIndex: null,
                        });
                        props.setMode("SUBSTITUTE");
                    }}
                >
                    다음 문제
                </button>
            </div>
        </div>
    );
}

export default A_Substitute;
