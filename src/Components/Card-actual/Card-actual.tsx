import { FC } from 'react'
import './card-actual.scss'
import { Link } from 'react-router-dom'

interface ICardActual {
  title: string
  path: string
  image: string
  type: string
}

export const CardActual: FC<ICardActual> = ({ image, path, title, type }) => {
  return (
    <Link
      to={path}
      className={'card-actual'}
      style={{ background: `url(${image}) center center / cover no-repeat` }}
    >
      <div className='card-actual__type'>{type}</div>
      <div className='card-actual__title'>{title}</div>
    </Link>
  )
}
