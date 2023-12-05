import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {emailSelector, setEmail, setStage} from '../../Redux/slice/authSlice'
import {authApi} from '../../services/auth.api'
import Button, {typesButton} from '../../UI-Components/Button/Button'
import {stageRegistration} from '../../utils/enums'
import {showToast} from "../../utils/common-functions";


export const Email = () => {
    const email = useAppSelector(emailSelector)
    const [error, setError] = useState<boolean>(false)
    const [disable, setDisabled] = useState<boolean>(true)

    const dispatch = useAppDispatch()
    const validRegex = /^\S+@\S+\.\S+$/

    useEffect(() => {
        setDisabled(!email.trim().match(validRegex))
    }, [email]);


    const validateEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        const value = e.target.value
        dispatch(setEmail(value.trim()))
    }

    const next = () => {
        dispatch(authApi.endpoints.checkEmail.initiate(email))
            .unwrap()
            .then((response) => {
                setDisabled(response.success)
                setError(response.success)
                if(!response.success) dispatch(setStage(stageRegistration.password))
            })
            .catch(async () => {
                await showToast("Ошибка соединения с сервером!")
                setDisabled(true)
            })
    }


    return (
        <>
            <div style={{position: 'relative'}}>
                <input
                    autoComplete='off'
                    className={
                        error
                            ? 'registration__field _field error'
                            : 'registration__field _field'
                    }
                    value={email}
                    name='email'
                    onChange={validateEmail}
                />
                {error && (
                    <div className='registration__field-error'>
                        Учетная запись с таким email уже существует
                    </div>
                )}
            </div>
            <Button
                disabled={disable}
                customClass='registration__button'
                view={typesButton.white}
                onClick={next}
            >Далее</Button>
        </>

    )
}
