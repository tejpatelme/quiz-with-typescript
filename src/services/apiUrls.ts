const BASE_URL = process.env.REACT_APP_API_URL;

export const API_URLS = {
  GET_QUIZZES: `${BASE_URL}quizzes`,
  SAVE_RESULT: `${BASE_URL}result/save`,
  UPDATE_RESULT: `${BASE_URL}users/result/update`,
  GET_USER: `${BASE_URL}users/user`,
  LOGIN_USER: `${BASE_URL}users/login`,
  SIGNUP_USER: `${BASE_URL}users/signup`,
};
