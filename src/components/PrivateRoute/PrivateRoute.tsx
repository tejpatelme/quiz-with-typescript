import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

type PrivateRouteProp = {
  path: string;
  element: React.ReactElement;
  end?: boolean;
};

export default function PrivateRoute({ path, ...props }: PrivateRouteProp) {
  const {
    state: { token },
  } = useAuth();

  // const {token} = JSON.parse(localStorage.getItem("quizLogin")!);

  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
