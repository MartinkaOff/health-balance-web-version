import { Capacitor } from '@capacitor/core'
import { FC } from 'react'
import './header.scss'
import { heightStatusBarSelector } from '../../Redux/slice/appSlice'
import { useAppSelector } from '../../hooks/redux-hooks'

interface HeaderProps {
  title: string
  customClass?: string
  additionalComponent?: any
  additionalOnClick?: any
  transparent?: boolean
}

export const Header: FC<HeaderProps> = ({
  title,
  customClass,
  additionalComponent,
  additionalOnClick,
  transparent
}) => {
  const statusBar = useAppSelector(heightStatusBarSelector)

  const back = () => {
    window.history.back()
  }

  return (
    <header
      className={'header ' + customClass}
      style={{
        padding:
          Capacitor.getPlatform() === 'ios'
            ? `${+statusBar}px 16px 24px 16px`
            : '0 16px',
        height: Capacitor.getPlatform() === 'ios' ? statusBar : 53
      }}
    >
      <div className='header__container'>
        <div
          className='header__back icon-icon_back'
          onClick={back}
          style={{
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className='header__title'>{title}</div>
        {additionalComponent && (
          <div onClick={additionalOnClick}>{additionalComponent}</div>
        )}
      </div>
    </header>
  )
}

export default Header
