import { FC } from 'react'
import { RewardCount } from '../Reward/Reward-count'
import { Link } from 'react-router-dom'
import {
  BASKET_ROUTE,
  EXCHANGE_HISTORY_ROUTE
} from '../../provider/constants-route'
import basketImg from '../../assets/image/icon_cart.svg'
import './shop.scss'
import { useAppSelector } from '../../hooks/redux-hooks'
import { balanceSelector } from '../../Redux/slice/appSlice'
import { basketSelector } from '../../Redux/slice/shopSlice'

interface IShopHead {
  marginBottom?: number
}

export const ShopHead: FC<IShopHead> = ({ marginBottom }) => {
  const balance = useAppSelector(balanceSelector)
  const basket = useAppSelector(basketSelector)

  return (
    <div className='shop-head' style={{ marginBottom: marginBottom }}>
      <div className='shop-head__title title-17'>
        <span>Ваш баланс:</span>
        <RewardCount count={balance} />
      </div>
      <div className='shop-head__link'>
        <Link
          to={EXCHANGE_HISTORY_ROUTE}
          className='shop-head__purchases text-blue'
        >
          Мои покупки
        </Link>
        <Link to={BASKET_ROUTE} className='shop-head__link'>
          <img src={basketImg} alt='basket' />
          {basket.length > 0 && (
            <span className={'shop-head__img-before active'} />
          )}
        </Link>
      </div>
    </div>
  )
}
