import { ChangeEvent, FC, useState } from 'react'
import './quiz.scss'

interface ICheckboxWithAnswer {
  question: string
  answerHandler: Function
  answers: {
    position: number
    value: string
  }[]
  id: number
}

export const CheckboxWithAnswer: FC<ICheckboxWithAnswer> = ({
  question,
  answerHandler,
  answers,
  id
}) => {
  const [value, setValue] = useState<number | null>(null)
  const [input, setInput] = useState<string>('')

  const handleClick = () => {
    answerHandler({ [id]: { variant: value, custom: input } })
    setValue(null)
    setInput('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value)
    if (+e.target.value === 3) setInput('')
  }

  let sortAnswers = [...answers].sort((a, b) => a.position - b.position)

  return (
    <div className={'quiz'}>
      <div className='quiz__title'>{question}</div>
      <div className='custom-checkbox' style={{ marginBottom: '10px' }}>
        {answers &&
          sortAnswers.map((item, i) => {
            if (i < answers.length - 1) {
              return (
                <div key={item.position}>
                  <input
                    // checked={value.includes(item.position + 1)}
                    // value={item.position + 1}
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
              )
            }
          })}
        <div>{answers && sortAnswers[sortAnswers.length - 1].value}</div>
        <input
          type='text'
          disabled={!(value === 1 || value === 2)}
          className='_field'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
        />
      </div>
      <button
        disabled={!value}
        className={
          value
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
