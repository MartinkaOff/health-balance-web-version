import { FC, useEffect } from 'react'
import './header-challenge.scss'
import { definitionColor, typeConversion } from '../../utils/common-functions'
import { IMAGE_URL } from '../../http'
import plug from '../../assets/image/plug.png'
import { Capacitor } from '@capacitor/core'
import { heightStatusBarSelector } from '../../Redux/slice/appSlice'
import { useAppSelector } from '../../hooks/redux-hooks'

interface IHeaderChallenge {
  image: string
  title: string
  type: number
  newChallengeCategory?: boolean
}

export const HeaderChallenge: FC<IHeaderChallenge> = ({
  image,
  title,
  type,
  newChallengeCategory = false
}) => {
  const statusBar = useAppSelector(heightStatusBarSelector)
  return (
    <div className={'header-challenge'}>
      <div
        // className={'header-challenge__image banner'}
        style={{
          top: Capacitor.getPlatform() === 'ios' ? statusBar : 0,
          // backgroundImage: `url("${image? IMAGE_URL + 'challenges/' + image:plug}")`
        }}
      />
      <div /* className='header-challenge__content' */>
        <div className='header-challenge-card card-active-challenge'>
          {/* <div className='card-active-challenge__icon'>
            {image && <img src={IMAGE_URL + 'challenges/' + image} alt='logo' />}
            {!image && <img src={plug} alt='logo' />}
          </div> */}
          <div className='card-active-challenge__info'>
            <div
              className={definitionColor(type, 'card-active-challenge__type')}
            >
              {typeConversion(type)}
              {!newChallengeCategory && <span>Новый</span>}
            </div>
            <div className='card-active-challenge__title'>{title}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
