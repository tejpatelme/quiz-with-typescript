import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuiz } from "../../context/quiz-context";
import { Option } from "../../data/quiz.type";

export default function Quiz() {
  const { quizId } = useParams();
  const { state, dispatch } = useQuiz();
  const { currentQuestionNo, currentQuiz, isOptionSelected } = state;
  const currentQuestion = currentQuiz?.questions[currentQuestionNo];
  const navigate = useNavigate();

  const handleOptionClick = (option: Option) => {
    dispatch({
      type: "SET_IS_OPTION_SELECTED",
      payload: { isOptionSelected: true },
    });

    if (option.isRight) {
      dispatch({ type: "INCREMENT_SCORE" });
    }
  };

  const setBackgroundColor = (option: Option) => {
    if (isOptionSelected) {
      return option.isRight ? "bg-green-700" : "bg-red-700";
    }
    return "bg-gray-700";
  };

  const incrementQuestionNumber = () => {
    if (currentQuiz?.questions.length === currentQuestionNo + 1) {
      return navigate("/result", { replace: true });
    }

    dispatch({
      type: "SET_IS_OPTION_SELECTED",
      payload: { isOptionSelected: false },
    });
    dispatch({ type: "INCREMENT_QUESTION_NO" });
  };

  useEffect(
    () => dispatch({ type: "SET_CURRENT_QUIZ", payload: { quizId } }),
    // eslint-disable-next-line
    []
  );

  return (
    <div className="max-w-2xl m-auto">
      <div className="h-64">
        <img
          src={currentQuestion?.imageURL}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-xl md:text-2xl font-semibold text-white mb-4">
          {currentQuestion?.question}
        </p>
        <div className="space-y-3  mb-8">
          {currentQuestion?.options.map((option, idx) => (
            <button
              key={idx}
              disabled={isOptionSelected}
              onClick={() => handleOptionClick(option)}
              className={`w-full p-4 text-left text-white ${setBackgroundColor(
                option
              )} rounded`}
            >
              {option.option}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-500">
            {currentQuestionNo + 1}/{currentQuiz?.questions.length}
          </span>
          <button
            onClick={incrementQuestionNumber}
            className="text-base font-semibold bg-white rounded py-1 px-2"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}
