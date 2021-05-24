type Option = {
  option: string;
  isRight: boolean;
};

type Question = {
  question: string;
  imageURL: string;
  options: Option[];
};

type Quiz = {
  id: string;
  imageURL: string;
  name: string;
  questions: Question[];
};

type Quizzes = Quiz[];

export type { Quizzes, Quiz, Question, Option };
