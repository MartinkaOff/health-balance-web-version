import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CHALLENGE_ROUTE } from '../../provider/constants-route'
import './profile.scss'

interface IProfileChallenge{
  completed_challenges: number,
  challenges: number
}

export const ProfileChallenge:FC<IProfileChallenge> = ({challenges,completed_challenges}) => {
  return (
    <div className={'profile-challenge'}>
      <div className='profile-challenge__title title-17'>Челленджи</div>
      <div className='profile-challenge__statistics-challenges'>
        <div className='profile-challenge__card-statistics'>
          <div className='profile-challenge__value'>{challenges}</div>
          <Link to={CHALLENGE_ROUTE} className='profile-challenge__item-text small-text'>
            Активные
          </Link>
        </div>
        <div className='profile-challenge__card-statistics'>
          <div className='profile-challenge__value'>{completed_challenges}</div>
          <Link to={CHALLENGE_ROUTE} className='profile-challenge__item-text small-text'>
            Пройдено
          </Link>
        </div>
      </div>
    </div>
  )
}
