import React, {ChangeEvent, useState} from 'react'
import {useCheckTaskQuery, useCompleteLessonMutation, useGetLessonByIdQuery} from '../../services/lessons.api'
import {showToast} from '../../utils/common-functions'
import {ModalSuccess} from '../Modals/Modal-success'
import '../Lecture/lecture.scss'
import {useParams} from "react-router-dom";
import {errorHandler} from "../../utils/errorsHandler";
import {Preloader} from "../Preloader/Preloader";

export const AnswerOptions = () => {

  const params = useParams()

  const {data:lesson}  = useGetLessonByIdQuery(Number(params.id))
  const {data:checkTask, isLoading: isLoadingCheckTask} = useCheckTaskQuery(Number(params.id))
  const [completeLesson,{isLoading}] = useCompleteLessonMutation()
  const answers = lesson?.answers
  const [value, setValue] = useState<string>('')
  const [title, setTitle] = useState('Задание выполнено')
  const [showReward, setShowReward] = useState(true)
  const [showModal, setShowModal] = useState<boolean>(false)


  const sendAnswer = async (lessonId: number) => {
    try {
      const dataTaskToCompleted = {
        answer: value
      }
      const response = await completeLesson({
        dataTaskToCompleted,
        id:lessonId
      }).unwrap()

      if (!response?.success) {
        setShowReward(false)
        setTitle('К сожалению, вы не правильно ответили на вопрос')
      }
    } catch (error) {
      console.log(error)
      setShowReward(false)
      setTitle('К сожалению, вы не правильно ответили на вопрос')
      await errorHandler(error)
    }finally {
      setShowModal(true)
    }
  }

  const complete = async () => {
    if (value) await sendAnswer(lesson?.id!)
    else await showToast('Вы не ответили на вопрос')
  }


  if (showModal) {
    return (
      <ModalSuccess
        showReward={showReward}
        setShowModal={setShowModal}
        showModal={showModal}
        updateActive={true}
        title={title}
        reward={lesson?.score}
      />
    )
  }

  if (checkTask?.exist)
    return <h1 style={{ textAlign: 'center', color: 'red' }}>Выполнено</h1>

  if(isLoadingCheckTask) return <Preloader height={'auto'}/>

  return (
    <>
      <div className='task-lecture__title title-17'>{lesson?.question}</div>
      <div className='task-lecture__answers-options custom-checkbox'>
        {answers?.map((answer, i) => (
          <div key={i}>
            <input
              type={'radio'}
              id={i.toString()}
              className={'custom-checkbox__radio'}
              name={'radio'}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={i}
            />
            <label htmlFor={i.toString()}>{answer}</label>
          </div>
        ))}
      </div>
      <button
        className='task-lecture__button-execute _button-white'
        disabled={isLoading}
        onClick={complete}
      >
        {isLoading ? (
          <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
        ) : (
          'Выполнить'
        )}
      </button>
    </>
  )
}
