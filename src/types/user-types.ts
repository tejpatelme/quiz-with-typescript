import { Option, Question } from "../types/quiz-types";

export type AttemptedQuestions = {
  question: string;
  imageURL: string;
  options: Option[];
  selectedOption: Option;
};

export type TakenQuiz = {
  _id: string;
  quizId: {
    _id: string;
    name: string;
    questions: Question[];
  };
  score: number;
  attemptedQuestions: AttemptedQuestions[];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  takenQuiz: TakenQuiz[];
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserSignup = {
  name: string;
  email: string;
  password: string;
};
