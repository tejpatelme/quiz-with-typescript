import { QuizAction, InitialQuizState } from "../types/reducer-types";

const initialState: InitialQuizState = {
  currentQuiz: null,
  score: 0,
  currentQuestionNo: 0,
  isOptionSelected: false,
  attemptedQuestions: [],
};

const quizReducer = (
  prevState: InitialQuizState,
  action: QuizAction
): InitialQuizState => {
  switch (action.type) {
    case "SET_CURRENT_QUIZ": {
      const { quizId, quizzes } = action.payload;
      const selectedQuiz = quizzes.find((quiz) => quiz._id === quizId) || null;

      return {
        ...prevState,
        currentQuiz: selectedQuiz,
      };
    }

    case "SET_SELECTED_OPTION": {
      const { question, option } = action.payload;

      return {
        ...prevState,
        attemptedQuestions: [
          ...prevState!.attemptedQuestions,
          { ...question, selectedOption: option },
        ],
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
        attemptedQuestions: [],
      };
    }

    default:
      return prevState;
  }
};

export { quizReducer, initialState };
