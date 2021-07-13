import { Link } from "react-router-dom";
import { Quiz } from "../../types/quiz-types";

type QuizTopicProp = {
  quiz: Quiz;
};

export default function QuizTopic({ quiz }: QuizTopicProp) {
  const { _id, name, imageURL } = quiz;
  return (
    <Link to={`/quiz/${_id}`}>
      <div className="rounded overflow-hidden h-44">
        <div className="relative h-4/5">
          <img
            className="w-full h-full object-cover"
            src={imageURL}
            alt="card-bg"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-gray-800 bg-opacity-60 flex items-center justify-center">
            <p className="text-lg font-semibold text-white">{name}</p>
          </div>
        </div>
        <button className="text-lg italic font-bold text-center text-white bg-purple-500 w-full h-1/5">
          PLAY QUIZ {">"}
          {">"}
          {">"}
        </button>
      </div>
    </Link>
  );
}
