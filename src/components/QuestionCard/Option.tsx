import { useQuiz } from "../../context/quiz-context";
import { Option as OptionType, Question } from "../../types/quiz-types";

type OptionProp = {
  option: OptionType;
  currentQuestion: Question;
  selectedOption: OptionType | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

export default function Option({
  currentQuestion,
  option,
  selectedOption,
  setSelectedOption,
}: OptionProp) {
  const {
    state: { isOptionSelected },
    dispatch,
  } = useQuiz();

  const handleOptionClick = (option: OptionType) => {
    dispatch({
      type: "SET_SELECTED_OPTION",
      payload: {
        question: currentQuestion,
        option: option,
      },
    });
    setSelectedOption(option);
    dispatch({
      type: "SET_IS_OPTION_SELECTED",
      payload: { isOptionSelected: true },
    });

    if (option.isRight) {
      dispatch({ type: "INCREMENT_SCORE" });
    }
  };

  const setBackgroundColor = (option: OptionType) => {
    if (!isOptionSelected) {
      return "bg-gray-700";
    }

    if (selectedOption!.option === option.option) {
      return option.isRight ? "bg-green-600" : "bg-red-500";
    }

    if (option.isRight) {
      return "bg-green-600";
    }

    return "bg-gray-700";
  };
  return (
    <button
      disabled={isOptionSelected}
      onClick={() => handleOptionClick(option)}
      className={`w-full p-4 text-left text-white ${setBackgroundColor(
        option
      )} rounded duration-300`}
    >
      {option.option}
    </button>
  );
}
