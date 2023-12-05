import React, { FC } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { heightStatusBarSelector } from "../../Redux/slice/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { QUESTIONNAIRE_ROUTE } from "../../provider/constants-route";
import { Capacitor } from "@capacitor/core";
import { NavigationComponent } from "../Navigation/Navigation-component";
import chart from "../../assets/image/Static-chart.png";

export const StartQuestionnaire: FC = () => {
    const statusBar = useAppSelector(heightStatusBarSelector)
    const navigate = useNavigate()

    const startTesting = () => {
        navigate(QUESTIONNAIRE_ROUTE)
    }

    return (
        <div className={'health-index'} style={{
            margin: Capacitor.getPlatform() === 'ios' ? `-${statusBar} 0 0 0` : 0,
        }}>
            <NavigationComponent />
            <div className='health-index__body'>
                <Link to={QUESTIONNAIRE_ROUTE} className='health-index__image'>
                    <img src={chart} alt='' />
                </Link>
                <div className='health-index__title main-title'>
                    Индексы появятся после прохождения тестирования
                </div>
                <div className='health-index__text'>
                    Результаты сохраняются, проходите опрос в любое удобное время
                </div>
            </div>

            <button
                onClick={startTesting}
                className='health-index__button _button-dark'
            >
                Пройти тестирование
            </button>
        </div>
    )
}