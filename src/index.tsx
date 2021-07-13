import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider } from "./context/quiz-context";
import { AuthProvider } from "./context/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QuizProvider>
        <Router>
          <App />
        </Router>
      </QuizProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
