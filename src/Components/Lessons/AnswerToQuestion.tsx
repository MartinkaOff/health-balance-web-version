import React, {ChangeEvent, useState} from 'react'
import {useCheckTaskQuery, useCompleteLessonMutation, useGetLessonByIdQuery} from '../../services/lessons.api'
import {showToast} from '../../utils/common-functions'
import {ModalSuccess} from '../Modals/Modal-success'
import '../Lecture/lecture.scss'
import {useParams} from "react-router-dom";
import {errorHandler} from "../../utils/errorsHandler";
import {Preloader} from "../Preloader/Preloader";

export const AnswerToQuestion = () => {
  const params = useParams()

  const {data:lesson}  = useGetLessonByIdQuery(Number(params.id))
  const {data:checkTask, isLoading: isLoadingCheckTask} = useCheckTaskQuery(Number(params.id))
  const [completeLesson,{isLoading}] = useCompleteLessonMutation()
  const [value, setValue] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)


  const complete = async () => {
    if (value.trim() && lesson?.id) {
      try {
        const dataTaskToCompleted = {
          answer: value.trim()
        }
        await completeLesson({
          dataTaskToCompleted,
          id:lesson.id
        }).unwrap()
        setShowModal(true)
      } catch (e) {
        await errorHandler(e)
      }
    } else {
      await showToast('Произошла ошибка')
    }
  }


  if (showModal) {
    return (
      <ModalSuccess
        setShowModal={setShowModal}
        showModal={showModal}
        updateActive={true}
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
      <input
        type='text'
        className='task-lecture__field _field'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
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
