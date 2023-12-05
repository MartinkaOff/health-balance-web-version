import { FC } from 'react'
import './profile.scss'

interface IProfileSteps {
  kilometer: number
  steps: number
}

export const ProfileSteps: FC<IProfileSteps> = ({ kilometer, steps }) => {
  return (
    <div className={'profile-steps'}>
      <div className='profile-steps__title title-17'>Шаги</div>
      <div className='profile-steps__items-steps'>
        <div className='profile-steps__row'>
          <div className='profile-steps__item-text small-text'>
            За все время
          </div>
          <div className='profile-steps__item-text small-text profile__item-text_yellow'>
            {steps}
          </div>
        </div>
        <div className='profile-steps__row'>
          <div className='profile-steps__item-text small-text'>
            Километров пройденно
          </div>
          <div className='profile-steps__item-text small-text profile__item-text_yellow'>
            {kilometer}
          </div>
        </div>
      </div>
    </div>
  )
}
