import { FC, useState } from 'react'
import './interview.scss'
import Question from './Question'
import MultipleQuestion from './MultipleQuestion'

interface IInterview {
  closeCallback: Function
}

const interviewTestData = [
  {
    id: 0,
    multiple: false,
    question: 'Первый вопрос',
    answers: [
      {
        id: 0,
        answer: 'Первый ответ'
      },
      {
        id: 1,
        answer: 'Второй ответ'
      },
      {
        id: 2,
        answer: 'Третий ответ'
      },
      {
        id: 3,
        answer: 'Четвертый ответ'
      }
    ]
  },
  {
    id: 1,
    multiple: true,
    question: 'Второй вопрос',
    answers: [
      {
        id: 0,
        answer: 'Первый ответ'
      },
      {
        id: 1,
        answer: 'Второй ответ'
      },
      {
        id: 2,
        answer: 'Третий ответ'
      },
      {
        id: 3,
        answer: 'Четвертый ответ'
      }
    ]
  },
  {
    id: 2,
    multiple: false,
    question: 'Третий вопрос',
    answers: [
      {
        id: 0,
        answer: 'Первый ответ'
      },
      {
        id: 1,
        answer: 'Второй ответ'
      },
      {
        id: 2,
        answer: 'Третий ответ'
      },
      {
        id: 3,
        answer: 'Четвертый ответ'
      }
    ]
  },
  {
    id: 3,
    multiple: true,
    question: 'Четвертый вопрос',
    answers: [
      {
        id: 0,
        answer: 'Первый ответ'
      },
      {
        id: 1,
        answer: 'Второй ответ'
      },
      {
        id: 2,
        answer: 'Третий ответ'
      },
      {
        id: 3,
        answer: 'Четвертый ответ'
      }
    ]
  }
]

const Interview: FC<IInterview> = ({ closeCallback }) => {
  const [questions, setQuestions] = useState<any>(interviewTestData)
  const [answers, setAnswers] = useState<any>([])
  const saveAnswer = (answer: any) => {
    setAnswers([...answers, answer])
  }

  return (
    <div className='interview-wrapper'>
      <div className='interview-wrapper__order'>
        <div
          style={answers.length === 0 ? { backgroundColor: '#fff' } : {}}
        ></div>
        <div
          style={answers.length === 1 ? { backgroundColor: '#fff' } : {}}
        ></div>
        <div
          style={answers.length === 2 ? { backgroundColor: '#fff' } : {}}
        ></div>
        <div
          style={answers.length === 3 ? { backgroundColor: '#fff' } : {}}
        ></div>
      </div>
      <div className='interview-wrapper__close'>
        <div onClick={() => closeCallback(false)}>&#10006;</div>
      </div>
      <div>
        {answers.length === questions.length ? (
          <div>Тест окончен</div>
        ) : (
          <div>
            {questions[answers.length].multiple ? (
              <MultipleQuestion
                question={questions[answers.length]}
                saveAnswer={saveAnswer}
              />
            ) : (
              <Question
                question={questions[answers.length]}
                saveAnswer={saveAnswer}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Interview
