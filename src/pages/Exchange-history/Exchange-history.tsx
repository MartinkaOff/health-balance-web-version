import './exchange-history.scss'
import Header from '../../Components/Header/Header'
import { BasketCard } from '../../Components/Basket/Basket-card'
import { Preloader } from '../../Components/Preloader/Preloader'
import { useGetOrdersQuery } from "../../services/shop.api";
import moment from "moment";
import { Back } from '../../Components/Back/Back';
import HeaderActive from '../../Components/Header-active/Header-active';

export const ExchangeHistory = () => {

    const { data: orders, isLoading } = useGetOrdersQuery(null)

    return (
        <div>
            {window.innerWidth > 500 ? <HeaderActive /> : ''}
            <div className={'exchange-history'}>
                <Back content={'История обмена'} />
                {
                    isLoading ? <Preloader height={'auto'} /> :
                        orders?.length ?
                            orders.map(order => (
                                <div className='exchange-history__item' key={order.id}>
                                    <div className='exchange-history__data'>
                                        {moment(order.created_at).format('DD.MM.YYYY')}
                                    </div>
                                    {
                                        order.products.map(product => (
                                            <BasketCard id={product.id} image={product.image}
                                                price={product.price} title={product.title}
                                                key={product.id} />
                                        ))
                                    }
                                </div>
                            ))
                            :
                            <div>Покупок нет!</div>
                }
            </div>
        </div>
    )
}
