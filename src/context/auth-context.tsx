import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/auth-reducer";
import { AuthContextType, AuthProviderProp } from "../types/context-types";

const AuthContext = createContext<AuthContextType>({
  state: {
    token: null,
    authenticatedUser: null,
  },
  dispatch: () => null,
});

const initialState = {
  token: null,
  authenticatedUser: null,
};

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
