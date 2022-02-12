import { Quiz } from "./quiz-types";
import { TakenQuiz, User } from "./user-types";

export type LoadDataResponse = {
  success: boolean;
  quizzes: Quiz[];
};

export type LoginUserResponse = {
  success: boolean;
  token: string;
  user: User;
};

export type LoadUserResponse = {
  success: boolean;
  user: User;
};

export type SignupResponse = {
  success: boolean;
};

export type SaveResultResponse = {
  success: boolean;
  takenQuiz: TakenQuiz[];
};
