import {FC} from 'react'
import icon_reward from '../../assets/image/icon_reward.svg'
import {addBasket, basketSelector} from '../../Redux/slice/shopSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import './shop.scss'
import plug from '../../assets/image/plug.png'
import plus from '../../assets/image/plus.svg'
import {IMAGE_URL} from '../../http'
import {Link} from 'react-router-dom'
import {PRODUCT_SCREEN_ROUTE} from '../../provider/constants-route'
import {IShopProduct} from "../../models/IShop";

interface IShopCard {
    product: IShopProduct
}

export const ShopCard: FC<IShopCard> = ({product}) => {

    const dispatch = useAppDispatch()
    const basket = useAppSelector(basketSelector)
    const addProductToBasket = async (product: IShopProduct) => dispatch(addBasket(product))

    return (
        <div className={'shop-card'} key={product.id}>
            <div className={'shop-card__container'}>
                <Link
                    to={PRODUCT_SCREEN_ROUTE + '/' + product.id}
                    className='shop-card__img'
                >
                    <img
                        src={product.image ? IMAGE_URL + 'shop/' + product.image : plug}
                        alt='product'
                    />
                </Link>
                <div className='shop-card__row'>
                    <Link
                        to={PRODUCT_SCREEN_ROUTE + '/' + product.id}
                        className='shop-card__title'
                    >
                        {product.title}
                    </Link>
                    <div className='shop-card__footer'>
                        <div className='shop-card__footer-column'>
                            <img
                                src={icon_reward}
                                alt='reward'
                                className='shop-card__icon-reward'
                            />
                            <div className='shop-card__count-reward'>{product.price}</div>
                        </div>
                        <div className='shop-card__footer-column'>
                            <div className='shop-card__count-product'>
                                {product.quantity} шт.
                            </div>
                            <div className='shop-card__icon-add'>
                                <img
                                    alt={'product'}
                                    src={plus}
                                    style={{
                                        transform: basket.find((item) => item.id === product.id)
                                            ? 'rotate(45deg)'
                                            : 'rotate(0deg)'
                                    }}
                                    onClick={() =>
                                        addProductToBasket(product)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
