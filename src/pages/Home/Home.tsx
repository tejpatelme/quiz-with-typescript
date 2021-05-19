import { Navbar, QuizTopic } from "../../components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <QuizTopic />
      </main>
    </>
  );
}
