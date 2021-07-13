type Option = {
  _id: boolean;
  option: string;
  isRight: boolean;
};

type Question = {
  question: string;
  imageURL: string;
  options: Option[];
  selectedOption?: Option;
};

type Quiz = {
  _id: string;
  imageURL: string;
  name: string;
  questions: Question[];
};

type Quizzes = Quiz[];

export type { Quizzes, Quiz, Question, Option };
