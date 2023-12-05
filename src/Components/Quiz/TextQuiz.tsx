import { FC, useState } from "react";
import "./quiz.scss";
interface ITextQuiz {
  question: string;
  answerHandler: Function;
}

const TextQuiz: FC<ITextQuiz> = ({ question, answerHandler }) => {
  const [value, setValue] = useState("");
  const handleClick = () => {
    setValue("");
    answerHandler(value);
  };
  const handleChange = (val: string) => {
    if (val.length > 0) {
      setValue(val);
    } else {
      setValue(val);
    }
  };
  return (
    <div className={"quiz"}>
      <div className="quiz__title">{question}</div>
      <input
        type="text"
        className="creating-title-challenge__field _field"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        disabled={value === ""}
        className={
          value === ""
            ? "questionnaire-page__button _button-white disabled"
            : "questionnaire-page__button _button-white"
        }
        onClick={handleClick}
      >
        Далее
      </button>
    </div>
  );
};

export default TextQuiz;
