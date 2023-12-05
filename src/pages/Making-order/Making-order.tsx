import Header from '../../Components/Header/Header'
import {ModalStatus} from '../../Components/Modals/Modal-status'
import {SHOP_ROUTE} from '../../provider/constants-route'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {basketSelector, clearBasket} from '../../Redux/slice/shopSlice'
import {useSendOrderMutation} from '../../services/shop.api'

import './making-order.scss'
import {errorHandler} from "../../utils/errorsHandler";

export const MakingOrder = () => {

    const basket = useAppSelector(basketSelector)
    const dispatch = useAppDispatch()

    const [send, {isSuccess,isLoading}] = useSendOrderMutation()

    const sendOrder = async () => {
        try {
            await send(basket.map((item) => item.id)).unwrap()
            dispatch(clearBasket())
        } catch (error) {
            await errorHandler(error)
        }
    }

    if (isSuccess) {
        return (
            <ModalStatus
                route={SHOP_ROUTE}
                subTitle={'Ожидайте письмо на email,проверьте папку “Спам” '}
                textButton={'Ок! Перейти в магазин'}
            />
        )
    }

    return (
        <div className={'making-order'}>
            <Header title={'Оформление'}/>
            <div className='making-order__title main-title'>
                Мы отправим информацию на почту и телефон, указанные в вашем профиле.
            </div>
            <button
                disabled={isLoading}
                className='making-order__button _button-white'
                onClick={sendOrder}
            >
                Получить
            </button>
        </div>
    )
}
