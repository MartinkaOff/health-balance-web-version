import React, {memo, useEffect, useState} from 'react';
import plug from '../../assets/image/plug.png'
import './Actual-version.scss'
import {useActualVersionQuery} from "../../services/api";
import {useAppSelector} from "../../hooks/redux-hooks";
import {dataUserSelector} from "../../Redux/slice/profileSlice";

const ActualVersion = () => {

    const profile = useAppSelector(dataUserSelector)
    const {data} = useActualVersionQuery(null)
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        if (profile?.version && data?.version) {
            setActive(data?.version != profile?.version)
        }
    }, [data, profile.version]);


    return (
        <div className={active ? 'actual-version active' : 'actual-version'} onClick={() => setActive(false)}>
            <div className={active ? 'actual-version__container active' : 'actual-version__container'}
                 onClick={(e) => e.stopPropagation()}>
                <div className="actual-version__cross" onClick={() => setActive(false)}>&#10006;</div>
                <div className="actual-version__logo">
                    <img src={plug} alt="logo"/>
                </div>
                <div className="actual-version__notification-text">
                    Доступна новая версия приложения. Обновитесь, пожалуйста
                </div>
            </div>
        </div>
    );
};

export default memo(ActualVersion)