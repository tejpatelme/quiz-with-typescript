import { quizzes } from "../data/database";
import { Quiz } from "../data/quiz.type";
import { ACTION, INITIAL_STATE } from "./quiz-reducer.types";

const initialState: INITIAL_STATE = {
  currentQuiz: null,
  score: 0,
  currentQuestionNo: 0,
  isOptionSelected: false,
};

const quizReducer = (
  prevState: typeof initialState,
  action: ACTION
): INITIAL_STATE => {
  switch (action.type) {
    case "SET_CURRENT_QUIZ": {
      const { quizId } = action.payload;
      const selectedQuiz: Quiz = quizzes.find(
        (quiz) => quiz.id === quizId
      ) as Quiz;

      return {
        ...prevState,
        currentQuiz: selectedQuiz,
      };
    }

    case "INCREMENT_SCORE": {
      return {
        ...prevState,
        score: prevState.score + 1,
      };
    }

    case "INCREMENT_QUESTION_NO": {
      return {
        ...prevState,
        currentQuestionNo: prevState.currentQuestionNo + 1,
      };
    }

    case "SET_IS_OPTION_SELECTED": {
      return {
        ...prevState,
        isOptionSelected: action.payload.isOptionSelected,
      };
    }

    case "RESET_QUIZ": {
      return {
        ...prevState,
        currentQuiz: null,
        score: 0,
        currentQuestionNo: 0,
        isOptionSelected: false,
      };
    }

    default:
      return prevState;
  }
};

export { quizReducer, initialState };
