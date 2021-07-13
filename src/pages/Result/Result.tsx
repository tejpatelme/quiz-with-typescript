import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Question, Option } from "../../types/quiz-types";
import { AttemptedQuestions } from "../../types/user-types";

type YourAnswersProp = {
  attemptedQuestions: AttemptedQuestions[];
};

function YourAnswers({ attemptedQuestions }: YourAnswersProp) {
  const setBackgroundColor = (option: Option, selectedOption: Option) => {
    if (selectedOption!.option === option.option) {
      return option.isRight ? "bg-green-600" : "bg-red-500";
    }

    if (option.isRight) {
      return "bg-green-600";
    }

    return "bg-gray-700";
  };

  return (
    <div className="py-4">
      {attemptedQuestions.map((question: Question, idx: number) => (
        <div key={idx} className="py-5 border-b border-gray-800">
          <p className="text-base md:text-xl font-semibold text-white mb-4">
            {question.question}
          </p>
          <div className="space-y-3">
            {question?.options.map((option, idx) => (
              <div
                key={idx}
                className={`w-full p-3 text-sm text-left text-white ${setBackgroundColor(
                  option,
                  question.selectedOption!
                )} rounded duration-300`}
              >
                {option.option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Result() {
  const { quizId } = useParams();
  const { state } = useAuth();
  const result = state.authenticatedUser?.takenQuiz.find(
    (result) => result.quizId._id === quizId
  );

  const navigate = useNavigate();

  const navigateToHome = () => navigate("/", { replace: true });

  return (
    <div className="p-4 sm:p-5 flex flex-col justify-center py-5 max-w-xl m-auto items-center min-h-screen">
      <div className="rounded-md bg-gray-800 p-8 mb-5 text-center">
        <div className="text-xl font-semibold text-white mb-4 flex-grow">
          You Score
        </div>
        <div className="text-4xl font-black text-white">
          {result?.score}/{result!.quizId.questions.length}
        </div>
      </div>
      <p className="text-white">Review your answers</p>
      <YourAnswers attemptedQuestions={result?.attemptedQuestions!} />
      <button
        onClick={navigateToHome}
        className="text-base font-semibold bg-white rounded py-1 px-2 self-start"
      >
        Back to home
      </button>
    </div>
  );
}
