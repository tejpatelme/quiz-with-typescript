import { ResultCard } from "../../components";
import { useAuth } from "../../context/auth-context";

export default function Results() {
  const {
    state: { authenticatedUser },
  } = useAuth();
  return (
    <div className="p-4 sm:p-7 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
      {authenticatedUser?.takenQuiz.length === 0 ? (
        <div className="rounded w-full bg-purple-600 bg-opacity-40 p-4 md:p-5 font-normal text-gray-200">
          Please take a quiz to see results :)
        </div>
      ) : (
        authenticatedUser?.takenQuiz.map((result) => (
          <ResultCard
            key={result._id}
            quizId={result.quizId._id}
            quizName={result.quizId.name}
            score={result.score}
          />
        ))
      )}
    </div>
  );
}
