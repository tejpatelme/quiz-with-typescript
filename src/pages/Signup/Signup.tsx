import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { signUpUser } from "../../services/users-requests";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    state: { token },
  } = useAuth();
  const navigate = useNavigate();

  const onSignupClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const success = await signUpUser({ name, email, password });

    if (success) {
      return navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="p-8 md:p-5 flex justify-center items-center h-screen">
      <div className="max-w-md flex-grow">
        <div className="mb-6">Logo</div>
        <h2 className="text-2xl font-bold text-white mb-8">Signup</h2>

        <form className="mb-3">
          <p className="text-base mb-3 text-gray-300 w-full">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="John"
            className="input-box"
          />

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
            onClick={onSignupClick}
            className="rounded px-4 py-3 font-bold text-white bg-purple-600 w-full"
          >
            Signup
          </button>
        </form>

        <p className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
