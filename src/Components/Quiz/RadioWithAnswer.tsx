import { ChangeEvent, FC, useState } from 'react'
import './quiz.scss'

interface IRadioWithAnswer {
  question: string
  answerHandler: Function
  answers: {
    position: number
    value: string
  }[]
  id: number
}

export const RadioWithAnswer: FC<IRadioWithAnswer> = ({
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
  }

  return (
    <div className={'quiz'}>
      <div className='quiz__title'>{question}</div>
      <div className='custom-checkbox' style={{ marginBottom: '10px' }}>
        {answers &&
          answers.map((item, i) => {
            if (i < answers.length - 1) {
              return (
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
              )
            }
          })}
        <div>{answers && answers[answers.length - 1].value}</div>
        <input
          className='_field'
          type='text'
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </div>
      <button
        disabled={!(value || input !== '')}
        className={
          !(value || input !== '')
            ? 'questionnaire-page__button _button-white disabled'
            : 'questionnaire-page__button _button-white'
        }
        onClick={handleClick}
      >
        Далее
      </button>
    </div>
  )
}
