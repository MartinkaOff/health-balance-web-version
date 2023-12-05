import Header from '../../Components/Header/Header'
import { BasketCard } from '../../Components/Basket/Basket-card'
import './basket-page.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MAKING_ORDER_ROUTE, PRODUCT_SCREEN_ROUTE } from '../../provider/constants-route'
import { ShopButton } from '../../Components/Shop/Shop-button'
import { basketSelector } from '../../Redux/slice/shopSlice'
import { useAppSelector } from '../../hooks/redux-hooks'
import { balanceSelector } from '../../Redux/slice/appSlice'
import { showToast } from '../../utils/common-functions'
import HeaderActive from '../../Components/Header-active/Header-active'
import { Back } from '../../Components/Back/Back'

export const BasketPage = () => {
  const navigate = useNavigate()
  const basket = useAppSelector(basketSelector)
  const balance = useAppSelector(balanceSelector)

  const sum = basket.reduce((sum, current) => sum + current.price, 0)
  const exchange = async () => {
    if (balance >= sum) navigate(MAKING_ORDER_ROUTE)
    else await showToast('На вашем счете недостаточно монет')
  }

  return (
    <div>
      {window.innerWidth > 500 ? <HeaderActive /> : ''}
      <div className={'basket-page'}>
        <Back content={'Корзина'} />
        <div className='basket-page__cards'>
          {basket.map((item) => (
            <Link to={PRODUCT_SCREEN_ROUTE + '/' + item.id} className='basket-page__card' key={item.id}>
              <BasketCard
                id={item.id}
                image={item.image}
                price={item.price}
                title={item.title}
              />
            </Link>
          ))}
          {basket.length === 0 && <h1>Корзина пуста</h1>}
        </div>
        <div className='basket-page__button'>
          {balance < sum && (
            <div className='basket-page__text-danger'>
              На вашем счете недостаточно монет
            </div>
          )}
          {basket.length !== 0 && (
            <ShopButton title={'Обменять'} rewardCount={sum} onClick={exchange} />
          )}
        </div>
      </div>
    </div>
  )
}
