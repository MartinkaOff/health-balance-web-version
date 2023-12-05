import { ChangeEvent, FC, useState } from 'react'
import './quiz.scss'
interface ITextQuiz {
  question: string
  answerHandler: Function
  answers: {
    position: number
    value: string
  }[]
  id: number
}

const RadioQuiz: FC<ITextQuiz> = ({ question, answerHandler, answers, id }) => {
  const [value, setValue] = useState<number | null>(null)
  const handleClick = () => {
    setValue(null)
    answerHandler({ [id]: value })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value)
  }

  return (
    <div className={'quiz'}>
      <div className='quiz__title'>{question}</div>
      <div className='custom-checkbox' style={{ marginBottom: '10px' }}>
        {answers &&
          answers.map((item) => (
            <div key={item.position}>
              <input
                checked={item.position + 1 === value}
                value={item.position + 1}
                type='radio'
                name={'radio' + id}
                className={'custom-checkbox__checkbox'}
                id={(item.position + id).toString()}
                onChange={handleChange}
              />
              <label htmlFor={(item.position + id).toString()}>
                {item.value}
              </label>
            </div>
          ))}
      </div>
      <button
        disabled={value === null}
        className={
          value === null
            ? 'questionnaire-page__button _button-white disabled'
            : 'questionnaire-page__button _button-white'
        }
        onClick={handleClick}
      >
        {id === 161 ? 'Завершить' : 'Далее'}
      </button>
    </div>
  )
}

export default RadioQuiz
