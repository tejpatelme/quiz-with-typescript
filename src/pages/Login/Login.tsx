import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { loginUser } from "../../services/users-requests";
import Logo from "../../assets/logo.png";

export default function Login() {
  const [loginStatus, setLoginStatus] = useState<
    "idle" | "loading" | "fulfilled" | "rejected"
  >("idle");
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
    setLoginStatus("loading");
    const success = await loginUser(dispatch, { email, password });

    if (success) {
      setLoginStatus("fulfilled");
      navigate(`${state?.from ? state.from : "/"}`, { replace: true });
    } else {
      setLoginStatus("rejected");
    }
  };

  const onGuestLoginClick = async () => {
    setLoginStatus("loading");

    const user = { email: "gilgamesh@gmail.com", password: "gilgamesh" };

    const success = await loginUser(dispatch, user);

    if (success) {
      setLoginStatus("fulfilled");
      navigate(`${state?.from ? state.from : "/"}`, { replace: true });
    } else {
      setLoginStatus("rejected");
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
        <div className="flex mb-6">
          <img src={Logo} alt="" />
        </div>
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
            disabled={loginStatus === "loading"}
            className="rounded px-4 py-3 font-bold text-white bg-purple-600 w-full disabled:cursor-not-allowed"
          >
            {loginStatus === "loading" ? "Logging In..." : "Login"}
          </button>
        </form>
        <button
          onClick={onGuestLoginClick}
          disabled={loginStatus === "loading"}
          className="rounded px-4 py-3 font-bold text-white bg-purple-600 w-full mb-3 disabled:cursor-not-allowed"
        >
          {loginStatus === "loading" ? "Logging In..." : "Login as Guest"}
        </button>
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
