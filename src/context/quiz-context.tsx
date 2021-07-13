import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Quiz } from "../types/quiz-types";
import { initialState, quizReducer } from "../reducers/quiz-reducer";
import { axiosRequest } from "../services/axios-request";
import { QuizContextType, QuizProviderProp } from "../types/context-types";
import { LoadDataResponse } from "../types/response-types";

const QuizContext = createContext<QuizContextType>({
  state: initialState,
  dispatch: () => null,
  quizzes: null,
});

export const QuizProvider = ({ children }: QuizProviderProp) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await axiosRequest(() =>
        axios.get<LoadDataResponse>(
          "https://quiz-app-backend.curiousguy.repl.co/quizzes"
        )
      );
      if (data.success && "quizzes" in data) {
        return setQuizzes(data.quizzes);
      }

      if (!data.success && "errorMessage" in data) {
        toast.error(data.errorMessage);
      }
    })();
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch, quizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
