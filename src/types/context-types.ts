import { Quiz } from "../types/quiz-types";
import { InitialAuthState, InitialQuizState } from "../types/reducer-types";

export type QuizContextType = {
  state: InitialQuizState;
  dispatch: React.Dispatch<any>;
  quizzes: Quiz[] | null;
};

export type QuizProviderProp = {
  children: React.ReactNode;
};

export type AuthContextType = {
  state: InitialAuthState;
  dispatch: React.Dispatch<any>;
};

export type AuthProviderProp = {
  children: React.ReactNode;
};
