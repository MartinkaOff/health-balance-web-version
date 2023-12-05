import React, {useEffect, useState} from 'react'
import './creating-challenge.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {creatingChallengeSelector, setDataChallenge} from '../../Redux/slice/challengeSlice'
import {resetPurposeChallenge} from '../../Redux/slice/purposeSlice'
import {KeysCreatingChallenge} from "../../models/IChallenge";
import {typesChallenge} from "../../utils/enums";

export const TypeChallenge = () => {
    const dispatch = useAppDispatch()
    const [isChangeType, setChangeType] = useState<boolean>(false)
    const {type} = useAppSelector(creatingChallengeSelector)

    const handlerType = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDataChallenge({
            name: e.target.name,
            value: +e.target.value
        }))
        setChangeType(true)
    }

    useEffect(() => {
        if (isChangeType) dispatch(resetPurposeChallenge())
    }, [type])

    return (
        <div className={'type-challenge'}>
            <div className='type-challenge__title main-title'>Тип челленджа</div>
            <div className='type-challenge__body' onChange={handlerType}>
                <input
                    type='radio'
                    name={'type' as KeysCreatingChallenge}
                    value={typesChallenge.personal}
                    id={'personal'}
                    defaultChecked={type === typesChallenge.personal}
                    className='type-challenge__input'
                />
                <label htmlFor='personal' className='type-challenge__label'>
                    Личный
                </label>
                <input
                    type='radio'
                    name={'type' as KeysCreatingChallenge}
                    value={typesChallenge.command}
                    className='type-challenge__input'
                    id={'command'}
                    defaultChecked={type === typesChallenge.command}
                />
                <label htmlFor='command' className='type-challenge__label command'>
                    Командный
                </label>
            </div>
        </div>
    )
}
