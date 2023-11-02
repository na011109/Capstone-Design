import React from "react";

const Answer = (props) => {
    const { summary, selectedSummaryIndex } = props;

    const handleNextQuizClick = () => {
        // "다음 퀴즈" 버튼을 클릭했을 때 summary와 selectedSummaryIndex 초기화
        props.setAnswerData({
            summary: [], // 빈 배열 또는 초기 상태에 맞는 값을 할당
            selectedSummaryIndex: null, // 선택한 항목의 인덱스 초기화
        });
        props.setMode("QUIZ");
    };

    return (
        <div>
            <div className="quiz">
                <br />
                <div className="problem">
                    {summary.map((item, index) => (
                        <div className="answer" key={index}>
                            <p
                                style={{
                                    color: index === selectedSummaryIndex ? "red" : "black",
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
                <button onClick={handleNextQuizClick}>다음 퀴즈</button>
            </div>
        </div>
    );
}

export default Answer;
