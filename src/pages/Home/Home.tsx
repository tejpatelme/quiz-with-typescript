import { useEffect } from "react";
import { QuizTopic } from "../../components";
import { useQuiz } from "../../context/quiz-context";
import { Quiz } from "../../types/quiz-types";

export default function Home() {
  const { dispatch, quizzes } = useQuiz();

  useEffect(() => dispatch({ type: "RESET_QUIZ" }), [dispatch]);
  return (
    <>
      <main className="w-full p-4 sm:p-10">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">
          All Quizzes
        </h3>
        {quizzes ? (
          <div className="">
            <div className="grid xl:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4">
              {quizzes!.map((quiz: Quiz) => (
                <QuizTopic key={quiz._id} quiz={quiz} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </main>
    </>
  );
}
