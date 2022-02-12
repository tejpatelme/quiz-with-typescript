import axios from "axios";
import toast from "react-hot-toast";
import { UserLogin, UserSignup } from "../types/user-types";
import { AuthAction } from "../types/reducer-types";
import { LoadUserResponse, SignupResponse } from "../types/response-types";
import { axiosRequest } from "./axios-request";

export const initializeUser = async (dispatch: React.Dispatch<AuthAction>) => {
  const data = await axiosRequest(() =>
    axios.get<LoadUserResponse>(
      "https://quiz-app-backend.curiousguy.repl.co/users/user"
    )
  );

  if (data.success && "user" in data) {
    return dispatch({
      type: "INITIALIZE_CURRENT_USER",
      payload: { user: data.user },
    });
  }

  if (!data.success && "errorMessage" in data) {
    toast.error(data.errorMessage);
  }
};

export const loginUser = async (
  dispatch: React.Dispatch<AuthAction>,
  user: UserLogin
): Promise<boolean> => {
  toast.loading("Logging in", { duration: 1500 });
  const data = await axiosRequest(() =>
    axios.post("https://quiz-app-backend.curiousguy.repl.co/users/login", {
      email: user.email,
      password: user.password,
    })
  );

  if ("user" in data && "token" in data) {
    toast.success("Login Successful");
    dispatch({
      type: "SET_LOGIN_INFO",
      payload: { token: data.token, user: data.user },
    });
  }

  if ("errorMessage" in data) {
    toast.error(data.errorMessage);
  }

  return data.success;
};

export const signUpUser = async (user: UserSignup): Promise<boolean> => {
  console.log(user);
  toast.loading("Signing up", { duration: 1500 });
  const data = await axiosRequest(() =>
    axios.post<SignupResponse>(
      "https://quiz-app-backend.curiousguy.repl.co/users/signup",
      user
    )
  );

  if (data.success) {
    toast.success("Signup Successful, Please login to continue");
  }

  if ("errorMessage" in data) {
    toast.error(data.errorMessage);
  }

  return data.success;
};
