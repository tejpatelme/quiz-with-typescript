import axios, { AxiosError, AxiosResponse } from "axios";
import {
  LoadDataResponse,
  LoadUserResponse,
  LoginUserResponse,
  SaveResultResponse,
  SignupResponse,
} from "../types/response-types";

type callBackFunction = {
  (): Promise<AxiosResponse<AxiosRequest>>;
};

type ServerError = {
  success: boolean;
  errorMessage: string;
};

type AxiosRequest =
  | LoadDataResponse
  | LoadUserResponse
  | LoginUserResponse
  | SignupResponse
  | SaveResultResponse;

export const axiosRequest = async (
  fn: callBackFunction
): Promise<AxiosRequest | ServerError> => {
  try {
    const response = await fn();
    return response?.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return err.response!.data;
      }
    }
    return {
      success: false,
      errorMessage: "Something went wrong!",
    };
  }
};
