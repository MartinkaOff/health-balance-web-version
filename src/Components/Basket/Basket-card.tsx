import './basket.scss'
import { RewardCount } from '../Reward/Reward-count'
import plug from '../../assets/image/plug.png'
import { IMAGE_URL } from '../../http'
import { FC } from 'react'
import { IBasket } from '../../models/IShop'


export const BasketCard:FC<IBasket> = ({image,price,title}) => {
  return (
    <div className={'basket-card'}>
      <div className='basket-card__container'>
        <div className='basket-card__image'>
          <img
            src={
             image ? IMAGE_URL + 'shop/' + image: plug
            }
            alt='product'
          />
        </div>
        <div className='basket-card__info'>
          <div className='basket-card__title'>
           {title}
          </div>
          <RewardCount count={price} fontSize={15} sizeIcon={15} />
        </div>
      </div>
    </div>
  )
}
