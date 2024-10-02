import axios from "axios";
import toast from "react-hot-toast";
import { Question } from "../types/quiz-types";
import { SaveResultResponse } from "../types/response-types";
import { axiosRequest } from "./axios-request";
import { API_URLS } from "./apiUrls";

export const saveResult = async (
  quizId: string,
  score: number,
  attemptedQuestions: Question[]
) => {
  const data = await axiosRequest(() =>
    axios.post<SaveResultResponse>(API_URLS.SAVE_RESULT, {
      result: { quizId, score, attemptedQuestions },
    })
  );

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
    axios.post<SaveResultResponse>(API_URLS.UPDATE_RESULT, {
      retakenQuiz: { quizId, score, attemptedQuestions },
    })
  );

  if ("takenQuiz" in data) {
    return data;
  }

  if ("errorMessage" in data) {
    toast.error(data.errorMessage);
  }
};
