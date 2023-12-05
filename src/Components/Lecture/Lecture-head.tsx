import { FC } from 'react'
import './lecture.scss'

interface IHead {
  title: string
  text: string
}

export const LectureHead: FC<IHead> = ({ text, title }) => {
  return (
    <div className='task-lecture__head'>
      <div className='task-lecture__title title-17'>{title}</div>
      <div className='task-lecture__text' dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  )
}
