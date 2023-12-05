import { FC } from 'react'
import './lecture.scss'
import { DownloadFile } from '../Lessons/DowloadFile'
import { AnswerToQuestion } from '../Lessons/AnswerToQuestion'
import { ScanQR } from '../Lessons/ScanQR'
import { AnswerOptions } from '../Lessons/AnswerOptions'

interface ILectureTask {
  typeTask: number
}

export const LectureTask: FC<ILectureTask> = ({ typeTask }) => {
  const showTask = (type: number) => {
    switch (type) {
      case 1:
        return <AnswerOptions />
      case 2:
        return <ScanQR />
      case 3:
        return <AnswerToQuestion />
      case 4:
        return <DownloadFile />
      default:
        return <div>Задач нет!</div>
    }
  }

  return showTask(typeTask)
}
