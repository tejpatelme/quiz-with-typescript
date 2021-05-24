import React, { createContext, useContext, useReducer } from "react";
import { initialState, quizReducer } from "../reducers/quiz-reducer";
import { INITIAL_STATE } from "../reducers/quiz-reducer.types";

type QuizContextType = {
  state: INITIAL_STATE;
  dispatch: React.Dispatch<any>;
};

const QuizContext = createContext<QuizContextType>({
  state: initialState,
  dispatch: () => null,
});

type QuizProviderProp = {
  children: React.ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderProp) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
