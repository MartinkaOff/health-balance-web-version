import { FC, useState } from 'react'
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

const CheckboxQuiz: FC<ITextQuiz> = ({
  question,
  answerHandler,
  answers,
  id
}) => {
  const [value, setValue] = useState<any>([])
  const handleClick = () => {
    setValue([])
    answerHandler({ [id]: value })
  }

  const handleChange = (val: number) => {
    if (value.includes(val)) {
      setValue(value.filter((e: number) => e !== val))
      return false
    }
    setValue([...value, +val])
  }
  return (
    <div className={'quiz'}>
      <div className='quiz__title'>{question}</div>
      <div className='custom-checkbox' style={{ marginBottom: '10px' }}>
        {answers &&
          answers.map((item) => (
            <div key={item.position}>
              <input
                // checked={value.includes(item.position+1)}
                value={item.position + 1}
                type='checkbox'
                name={'radio' + id}
                className={'custom-checkbox__checkbox'}
                id={(item.position + id).toString()}
                onChange={(e) => handleChange(+e.target.value)}
              />
              <label htmlFor={(item.position + id).toString()}>
                {item.value}
              </label>
            </div>
          ))}
      </div>
      <button
        disabled={!value.length}
        className={
          value.length
            ? 'questionnaire-page__button _button-white'
            : 'questionnaire-page__button _button-white disabled'
        }
        onClick={handleClick}
      >
        Далее
      </button>
    </div>
  )
}

export default CheckboxQuiz
