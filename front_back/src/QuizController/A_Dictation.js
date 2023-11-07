import React from "react";

const A_Dictation = (props) => {
    const { shuffledData, selectedIndex, incorrectIndex } = props;

    return (
        <div>
            {selectedIndex === incorrectIndex ? (
                <h2 style={{ color: "blue" }}>정답</h2>
            ) : (
                <h2 style={{ color: "red" }}>오답</h2>
            )}
            <br />

            <div className="quiz">
                <br />
                <div className="problem">
                    {shuffledData.map((item, index) => (
                        <div className="answer" key={index}>
                            <p
                                style={{
                                    color: index === incorrectIndex ? "blue" : index === selectedIndex ? "red" : "black",
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
                        //     dictation: [],
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

export default A_Dictation;