import { Home, Quiz, Result, Login, Signup, Results, Profile } from "./pages";
import { PrivateRoute, Sidebar, Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { initializeUser } from "./services/users-requests";

function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const {
    state: { token },
    dispatch,
  } = useAuth();

  useEffect(() => {
    dispatch({ type: "SET_TOKEN_FROM_LOCAL_STORAGE" });
  }, [dispatch]);

  useEffect(() => {
    const setupDefaultHeaders = () => {
      if (token) {
        return (axios.defaults.headers.common["Authorization"] = token);
      }
      delete axios.defaults.headers.common["Authorization"];
    };

    setupDefaultHeaders();
  }, [token]);

  useEffect(() => {
    if (token) {
      initializeUser(dispatch);
    }
  }, [token, dispatch]);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <div className="block m-auto sm:flex items-start">
              <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <Navbar setShowSidebar={setShowSidebar} />
              <Routes>
                <PrivateRoute path="/" element={<Home />} />
                <PrivateRoute path="/results" element={<Results />} />
                <PrivateRoute path="/profile" element={<Profile />} />
              </Routes>
            </div>
          }
        />
        <PrivateRoute path="/result/:quizId" element={<Result />} />
        <PrivateRoute end path="/quiz/:quizId" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
