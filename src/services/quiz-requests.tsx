import axios from "axios";
import toast from "react-hot-toast";
import { Question } from "../types/quiz-types";
import { SaveResultResponse } from "../types/response-types";
import { axiosRequest } from "./axios-request";

export const saveResult = async (
  quizId: string,
  score: number,
  attemptedQuestions: Question[]
) => {
  const data = await axiosRequest(() =>
    axios.post<SaveResultResponse>(
      "https://quiz-app-backend.curiousguy.repl.co/users/result/save",
      {
        result: { quizId, score, attemptedQuestions },
      }
    )
  );

  console.log(data);

  if ("takenQuiz" in data) {
    return data;
  }

  if ("errorMessage" in data) {
    toast.error(data.errorMessage);
  }
};

export const updateResult = async (
  quizId: string,
  score: number,
  attemptedQuestions: Question[]
) => {
  const data = await axiosRequest(() =>
    axios.post<SaveResultResponse>(
      "https://quiz-app-backend.curiousguy.repl.co/users/result/update",
      {
        retakenQuiz: { quizId, score, attemptedQuestions },
      }
    )
  );

  console.log(data);

  if ("takenQuiz" in data) {
    return data;
  }

  if ("errorMessage" in data) {
    toast.error(data.errorMessage);
  }
};
