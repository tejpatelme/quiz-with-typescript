import axios from "axios";
import toast from "react-hot-toast";
import { UserLogin, UserSignup } from "../types/user-types";
import { AuthAction } from "../types/reducer-types";
import { LoadUserResponse, SignupResponse } from "../types/response-types";
import { axiosRequest } from "./axios-request";
import { API_URLS } from "./apiUrls";

export const initializeUser = async (dispatch: React.Dispatch<AuthAction>) => {
  const data = await axiosRequest(() =>
    axios.get<LoadUserResponse>(API_URLS.GET_USER)
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
    axios.post(API_URLS.LOGIN_USER, {
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
  toast.loading("Signing up", { duration: 1500 });
  const data = await axiosRequest(() =>
    axios.post<SignupResponse>(API_URLS.SIGNUP_USER, user)
  );

  if (data.success) {
    toast.success("Signup Successful, Please login to continue");
  }

  if ("errorMessage" in data) {
    toast.error(data.errorMessage);
  }

  return data.success;
};
