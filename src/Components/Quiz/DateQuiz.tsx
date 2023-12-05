import { FC, forwardRef, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import './quiz.scss'
import ru from 'date-fns/locale/ru'

registerLocale('ru', ru)

interface IDateQuiz {
  question: string
  answerHandler: Function
}

export const DateQuiz: FC<IDateQuiz> = ({ question, answerHandler }) => {
  const [value, setValue] = useState<any>([])
  const handleClick = () => {
    setValue([])
    answerHandler(value)
  }

  const changeDate = (date: any) => {
    setValue(date)
  }

  return (
    <div className={'quiz'}>
      <div className='quiz__title'>{question}</div>
      <ReactDatePicker
        onChange={changeDate}
        dateFormat='dd.MM.yyyy'
        selected={Array.isArray(value) ? null : value}
        locale={ru}
        customInput={<ExampleCustomInput />}
      />
      <button
        disabled={value.length === 0}
        className={
          value.length === 0
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

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <button
      onClick={onClick}
      style={{ textAlign: 'left', marginBottom: 10 }}
      className='_field'
    >
      {value}
    </button>
  )
})
