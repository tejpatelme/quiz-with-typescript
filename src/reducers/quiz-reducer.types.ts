import { Quiz } from "../data/quiz.type";

type INITIAL_STATE = {
  currentQuiz: Quiz | null;
  score: number;
  currentQuestionNo: number;
  isOptionSelected: boolean;
};

type ACTION =
  | { type: "SET_CURRENT_QUIZ"; payload: { quizId: string } }
  | { type: "SET_IS_OPTION_SELECTED"; payload: { isOptionSelected: boolean } }
  | { type: "INCREMENT_SCORE" }
  | { type: "INCREMENT_QUESTION_NO" }
  | { type: "RESET_QUIZ" };

export type { ACTION, INITIAL_STATE };
