import { FC } from 'react'
import './health-index-result.scss'

interface ICardBiologyAge {
  age: number
}

export const CardBiologyAge: FC<ICardBiologyAge> = ({ age }) => {
  return (
    <div className={'card-biology-age'}>
      <div className='card-biology-age__title'>Биологический возраст</div>
      <div className='card-biology-age__age'>{age}</div>
    </div>
  )
}
