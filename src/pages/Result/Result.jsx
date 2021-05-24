import { useNavigate } from "react-router";
import { useQuiz } from "../../context/quiz-context";

export default function Result() {
  const { state } = useQuiz();
  const { score, currentQuiz } = state;
  const navigate = useNavigate();

  const navigateToHome = () => navigate("/", { replace: true });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-xl font-semibold text-white mb-4">You Score</div>
      <div className="text-4xl font-black text-white mb-8">
        {score}/{currentQuiz.questions.length}
      </div>
      <button
        onClick={navigateToHome}
        className="text-base font-semibold bg-white rounded py-1 px-2"
      >
        Back to home
      </button>
    </div>
  );
}
