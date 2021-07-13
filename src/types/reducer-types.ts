import { TakenQuiz, User } from "../types/user-types";
import { Option, Question, Quiz } from "../types/quiz-types";

export type InitialAuthState = {
  token: string | null;
  authenticatedUser: User | null;
};

export type InitialQuizState = {
  currentQuiz: Quiz | null;
  score: number;
  currentQuestionNo: number;
  isOptionSelected: boolean;
  attemptedQuestions: Question[];
};

export type AuthAction =
  | {
      type: "SET_LOGIN_INFO";
      payload: { token: string; user: User };
    }
  | { type: "SET_TOKEN_FROM_LOCAL_STORAGE" }
  | { type: "INITIALIZE_CURRENT_USER"; payload: { user: User } }
  | { type: "LOGOUT_USER" }
  | { type: "SAVE_RESULT"; payload: { result: TakenQuiz[] } };

export type QuizAction =
  | { type: "SET_CURRENT_QUIZ"; payload: { quizId: string; quizzes: Quiz[] } }
  | {
      type: "SET_SELECTED_OPTION";
      payload: { question: Question; option: Option };
    }
  | { type: "SET_IS_OPTION_SELECTED"; payload: { isOptionSelected: boolean } }
  | { type: "INCREMENT_SCORE" }
  | { type: "INCREMENT_QUESTION_NO" }
  | { type: "RESET_QUIZ" };
