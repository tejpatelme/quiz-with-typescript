import { useNavigate } from "react-router-dom";

type ResultCardProp = {
  quizId: string;
  quizName: string;
  score: number;
};

export default function ResultCard({
  quizId,
  quizName,
  score,
}: ResultCardProp) {
  const navigate = useNavigate();

  const navigateToResult = () => navigate(`/result/${quizId}`);

  const retakeQuiz = () => navigate(`/quiz/${quizId}`);

  return (
    <div className="rounded p-4 sm:p-5 bg-gray-800 bg-opacity-60">
      <h3 className="font-semibold text-base text-white mb-1">{quizName}</h3>
      <div className="text-sm font-medium text-yellow-500 mb-3">
        Score • {score}{" "}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={navigateToResult}
          className="rounded px-2 py-1 text-sm font-normal text-white bg-purple-500"
        >
          See Results
        </button>
        <button
          onClick={retakeQuiz}
          className="rounded px-2 py-1 text-sm font-normal text-purple-600 border border-purple-500"
        >
          Retake
        </button>
      </div>
    </div>
  );
}
