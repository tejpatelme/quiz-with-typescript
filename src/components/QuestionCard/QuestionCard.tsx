import { Option as OptionType, Question } from "../../types/quiz-types";
import Option from "./Option";

type QuestionCardProp = {
  currentQuestion: Question;
  selectedOption: OptionType | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

export default function QuestionCard({
  currentQuestion,
  selectedOption,
  setSelectedOption,
}: QuestionCardProp) {
  return (
    <>
      <div className="h-64">
        <img
          src={currentQuestion?.imageURL}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-xl md:text-2xl font-semibold text-white mb-4">
          {currentQuestion?.question}
        </p>
        <div className="space-y-3  mb-8">
          {currentQuestion?.options.map((option, idx) => (
            <Option
              key={idx}
              currentQuestion={currentQuestion}
              option={option}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ))}
        </div>
      </div>
    </>
  );
}
