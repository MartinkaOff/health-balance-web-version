import { FC } from 'react'
import './header-two.scss'
import icon_chat from '../../assets/image/icon_chat.svg'
import { Link } from 'react-router-dom'
import { CHAT__ROUTE } from '../../provider/constants-route'

interface IHeaderTwo {
  title: string
  marginBottom: number
}

export const HeaderTwo: FC<IHeaderTwo> = ({ title, marginBottom }) => {
  return (
    <div className={'header-two'} style={{ marginBottom: marginBottom }}>
      <div className='header-two__title main-title'>{title}</div>
      {/* <Link to={CHAT__ROUTE} className='header-two__icon'>
        <img src={icon_chat} alt='chat' />
      </Link> */}
    </div>
  )
}
