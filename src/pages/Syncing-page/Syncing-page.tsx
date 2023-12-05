import './syncing-page.scss'
import Header from '../../Components/Header/Header'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {useState} from 'react'
import {ModalFit} from '../../Components/Modals/Modal-fit'
import {pedometers, pedometerSelector, setPedometer} from "../../Redux/slice/settingsSlice";
import {PEDOMETERS} from "../../utils/enums";
import Pedometer from "../../plugins/pedometer";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

export const SyncingPage = () => {
    const pedometer = useAppSelector(pedometerSelector)
    const dispatch = useAppDispatch()
    const [activeModal, setActiveModal] = useState<boolean>(false)


    const togglePedometer = async (value: PEDOMETERS) => {
        if (value === pedometer) {
            dispatch(setPedometer(0))
            await GoogleAuth.signOut()
            await Pedometer.reset()
            await Pedometer.stop()
            return
        }
        dispatch(setPedometer(value))
        if (value === PEDOMETERS.healthBalance) {
            await GoogleAuth.signOut()
            await Pedometer.start({token: localStorage.getItem('token')})
        } else if (value === PEDOMETERS.googleFit) {
            setActiveModal(true)
        }
    }

    return (
        <div className={'sync-page'}>
            <Header title={'Синхронизация'}/>
            {/*<h1 className='sync-page__head'>Google Fit Синхронизация</h1>*/}
            {/*<div className='sync-page__text'>*/}
            {/*    Google Fit — это открытая платформа, которая позволяет вам*/}
            {/*    контролировать свои данные о фитнесе из нескольких приложений и*/}
            {/*    устройств*/}
            {/*</div>*/}
            {/*<div className='sync-page__row handler-sync'>*/}
            {/*    <div className='handler-sync__column'>*/}
            {/*        <button className='button-google-fit' onClick={toggleGoogleFit}>*/}
            {/*            <img*/}
            {/*                className='button-google-fit__logo'*/}
            {/*                src={google}*/}
            {/*                alt='google'*/}
            {/*            />*/}
            {/*            <div className='button-google-fit__title'>*/}
            {/*                {isGoogleFit === 1 ? 'Активировать' : 'Отключить'} Google Fit*/}
            {/*            </div>*/}
            {/*        </button>*/}
            {/*        <div className='handler-sync__text'>*/}
            {/*            Синхронизируйте Health Balance с Google Fit. Подключение к Google*/}
            {/*            Fit позволяет просматривать данные о шагах за последние 3 месяца*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className='sync-page__note'>*/}
            {/*    * Вы можете отключиться от Google Fit в любое время*/}
            {/*</div>*/}
            {
                pedometers?.map((p, i) => (
                    <div className='sync-page__item' key={i}>
                        <div className='sync-page__column'>
                            <div className='sync-page__icon'>
                                <img src={p.icon} alt={p.icon}/>
                            </div>
                            <div className='sync-page__title'>{p.title}</div>
                        </div>
                        <div onClick={() => togglePedometer(p.value)}
                             className={'sync-page__action ' + (pedometer === p.value ? 'text-yellow' : 'text-blue')}>
                            {pedometer === p.value ? 'Отключить' : 'Подключить'}
                        </div>
                        {/*<input*/}
                        {/*   */}
                        {/*    type={'radio'}*/}
                        {/*    id={p.title}*/}
                        {/*    name={'pedometer'}*/}
                        {/*    value={p.value}*/}
                        {/*    className={'sync-page__radio'}/>*/}
                    </div>
                ))
            }
            {activeModal && (
                <ModalFit active={activeModal} setActive={setActiveModal}>
                    Приложение будет использовать
                    https://www.googleapis.com/auth/fitness.activity.read для отображения
                    данных шагов из Google Fit пользователя на странице активности
                    приложения, чтобы пользователи могли просматривать пройденное
                    количество шагов через приложение и синхронизировать изменения с
                    Google Fit.
                </ModalFit>
            )}
        </div>
    )
}
