import { ChangeEvent, FC, useState } from "react";
import "./quiz.scss";
interface INumberQuiz {
  question: string;
  answerHandler: Function;
  id: number
}

export const NumberQuiz: FC<INumberQuiz> = ({ question, answerHandler,id }) => {
  const [value, setValue] = useState<string | number>('');
  const handleClick = () => {
    setValue('');
    answerHandler({[id]:+value});
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value.replace(/\D/,''))    
  };

  return (
    <div className={"quiz"}>
      <div className="quiz__title">{question}</div>
      <input
        type="number"       
        className="creating-title-challenge__field _field"
        value={value}
        onChange={handleChange}
      />
      <button
        disabled={value === ''}
        className={
          value === ''
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

