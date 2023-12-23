import { FC } from 'react'
import { sklonenie } from '../../utils/common-functions'
import './steps.scss'

interface ISteps {
  maxStepsCount: number
  userStepsCount: number
}

export const Steps: FC<ISteps> = ({ maxStepsCount, userStepsCount }) => {
  const lineCount = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
  ]
  const totalDivisions: number = 360
  const valueDivisions = 10

  const definitionColor = (index: number): string => {
    const numberOfDivisionsPassed: number =
      (totalDivisions * userStepsCount) / maxStepsCount
    if (index * valueDivisions <= numberOfDivisionsPassed) return '#fff'
    return '#000'
  }

  return (
    <div className={'steps'}>
      <div className='steps__container'>
        {lineCount.map((item, i) => (
          <div
            className='steps__degree'
            key={i}
            style={{
              transform: `rotate(${180 + i * 10}deg)`,
              background: definitionColor(i)
            }}
          />
        ))}
        <div className='steps__body'>
          <div className='steps__title'>Вы прошли</div>
          <div className='steps__count'>{userStepsCount}</div>
          <div className='steps__title'>{sklonenie(userStepsCount, ['шаг', 'шага', 'шагов'])}</div>
        </div>
      </div>
    </div>
  )
}
