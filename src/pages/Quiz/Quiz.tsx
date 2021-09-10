import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import { useQuiz } from "../../context/quiz-context";
import { Option } from "../../types/quiz-types";
import { saveResult, updateResult } from "../../services/quiz-requests";
import { useAuth } from "../../context/auth-context";
import { Spinner } from "../../components";

export default function Quiz() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isSavingResult, setIsSavingResult] = useState<boolean>(false);
  const { quizId } = useParams();
  const { dispatch: authDispatch, state: authState } = useAuth();
  const { state, dispatch, quizzes } = useQuiz();
  const { currentQuestionNo, currentQuiz, attemptedQuestions, score } = state;
  const currentQuestion = currentQuiz?.questions[currentQuestionNo];
  const isLastQuestion =
    currentQuiz?.questions.length === currentQuestionNo + 1;
  const isQuizTaken = authState.authenticatedUser?.takenQuiz.find(
    (result) => result.quizId._id === quizId
  );
  const navigate = useNavigate();

  const saveAndNavigateToResult = async () => {
    setIsSavingResult(true);
    const data = await saveResult(currentQuiz!._id, score, attemptedQuestions);
    setIsSavingResult(false);

    if (data!.success) {
      authDispatch({
        type: "SAVE_RESULT",
        payload: { result: data?.takenQuiz },
      });

      return navigate(`/result/${currentQuiz?._id}`, { replace: true });
    }
  };

  const updateAndNavigateToResult = async () => {
    setIsSavingResult(true);
    const data = await updateResult(
      currentQuiz!._id,
      score,
      attemptedQuestions
    );
    setIsSavingResult(false);

    if (data!.success) {
      authDispatch({
        type: "SAVE_RESULT",
        payload: { result: data?.takenQuiz },
      });

      return navigate(`/result/${currentQuiz?._id}`, { replace: true });
    }
  };

  const incrementQuestionNumber = async () => {
    if (isLastQuestion) {
      return isQuizTaken
        ? updateAndNavigateToResult()
        : saveAndNavigateToResult();
    }
    setSelectedOption(null);
    dispatch({
      type: "SET_IS_OPTION_SELECTED",
      payload: { isOptionSelected: false },
    });
    dispatch({ type: "INCREMENT_QUESTION_NO" });
  };

  useEffect(
    () => {
      if (quizzes) {
        dispatch({ type: "SET_CURRENT_QUIZ", payload: { quizId, quizzes } });
      }
    },
    // eslint-disable-next-line
    [quizzes]
  );

  return (
    <>
      {!currentQuiz || isSavingResult ? (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
          <Spinner size="50" color="#E5E7EB" />
          <span className="text-gray-200 font-medium text-lg mt-2">
            Saving Result
          </span>
        </div>
      ) : (
        <div className="max-w-2xl m-auto">
          <QuestionCard
            currentQuestion={currentQuestion!}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <div className="flex justify-between items-center p-4">
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
      )}
    </>
  );
}
