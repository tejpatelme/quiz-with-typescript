import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { loginUser } from "../../services/users-requests";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    state: { token },
    dispatch,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  type LocationState = {
    from: string | null;
  };

  const state = location.state as LocationState;

  const onLoginSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const success = await loginUser(dispatch, { email, password });

    if (success) {
      navigate(`${state?.from ? state.from : "/"}`, { replace: true });
    }
  };

  useEffect(() => {
    if (token) {
      token && navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="p-8 md:p-5 flex justify-center items-center h-screen">
      <div className="max-w-md flex-grow">
        <div className="flex mb-6">Logo</div>
        <h2 className="text-2xl font-bold text-white mb-8">Login</h2>

        <form onSubmit={onLoginSubmit} className="mb-3">
          <p className="text-base mb-3 text-gray-300 w-full">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="johndoe@gmail.com"
            className="input-box"
          />
          <p className="text-base mb-3 text-gray-300 w-full">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className="input-box"
          />
          <button
            type="submit"
            className="rounded px-4 py-3 font-bold text-white bg-purple-600 w-full"
          >
            Login
          </button>
        </form>

        <p className="text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
