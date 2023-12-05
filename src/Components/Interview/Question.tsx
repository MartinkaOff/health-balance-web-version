import { FC, useState } from 'react'

interface IQuestion {
  question: {
    id: number
    multiple: boolean
    question: string
    answers: any
  }
  saveAnswer: Function
}

const Question: FC<IQuestion> = ({ question, saveAnswer }) => {
  const [answer, setAnswer] = useState<any>()
  const changeAnswerHandler = (val: any) => {
    setAnswer(Number(val))
  }

  const saveAnswerHandler = () => {
    if (answer === undefined) {
      return false
    }
    saveAnswer(answer)
  }

  return (
    <div className='question-wrapper'>
      <p>{question.question}</p>
      <div>
        <div className='custom-checkbox'>
          {question.answers.map((answer: any, i: number) => {
            return (
              <div key={answer.id}>
                <input
                  onChange={(e) => changeAnswerHandler(e.target.value)}
                  value={answer.id}
                  name='answer'
                  type='radio'
                  id={answer.id + 'ans'}
                  style={{ display: 'none' }}
                />
                <label htmlFor={answer.id + 'ans'}>{answer.answer}</label>
              </div>
            )
          })}
        </div>
      </div>
      <div className='question-wrapper__ button'>
        <button onClick={saveAnswerHandler} className='_button-white'>
          Далее
        </button>
      </div>
    </div>
  )
}

export default Question

// {
//   question.answers.map((answer: any) => {
//     return (
//       <div key={answer.id}>
//         <input
//           //onChange={(e) => changeAnswerHandler(e.target.value)}
//           //value={answer.id}
//           type='radio'
//           id={answer.id + 'test'}
//         />
//         <label htmlFor={answer.id + 'test'}>{answer.answer}</label>
//       </div>
//     )
//   })
// }
