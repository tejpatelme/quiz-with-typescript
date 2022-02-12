import { AuthAction, InitialAuthState } from "../types/reducer-types";

export const authReducer = (
  prevState: InitialAuthState,
  action: AuthAction
): InitialAuthState => {
  switch (action.type) {
    case "SET_LOGIN_INFO": {
      const { token, user } = action.payload;
      localStorage?.setItem("quizLogin", JSON.stringify({ token }));

      return {
        token,
        authenticatedUser: user,
      };
    }

    case "SET_TOKEN_FROM_LOCAL_STORAGE": {
      const { token } = JSON.parse(localStorage.getItem("quizLogin")!) || {
        token: null,
      };

      return {
        ...prevState,
        token,
      };
    }

    case "INITIALIZE_CURRENT_USER": {
      const { user } = action.payload;

      return {
        ...prevState,
        authenticatedUser: user,
      };
    }

    case "LOGOUT_USER": {
      localStorage.removeItem("quizLogin");

      return {
        token: null,
        authenticatedUser: null,
      };
    }

    case "SAVE_RESULT": {
      const { result } = action.payload;

      return {
        ...prevState,
        authenticatedUser: {
          ...prevState.authenticatedUser!,
          takenQuiz: [...result],
        },
      };
    }

    default: {
      return prevState;
    }
  }
};
