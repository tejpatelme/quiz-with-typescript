import { useEffect } from "react";
import { Navbar, QuizTopic } from "../../components";
import { useQuiz } from "../../context/quiz-context";
import { quizzes } from "../../data/database";

export default function Home() {
  const { dispatch } = useQuiz();

  useEffect(() => dispatch({ type: "RESET_QUIZ" }), [dispatch]);
  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="grid xl:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4">
          {quizzes.map((quiz) => (
            <QuizTopic key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </main>
    </>
  );
}
