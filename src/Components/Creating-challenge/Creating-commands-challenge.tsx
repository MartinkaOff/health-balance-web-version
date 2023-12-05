import React, {ChangeEvent, useEffect} from 'react'
import {creatingChallengeSelector, setDataChallenge, setDisabledButton} from '../../Redux/slice/challengeSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import './creating-challenge.scss'
import {KeysCreatingChallenge} from "../../models/IChallenge";

export const CreatingCommandsChallenge = () => {

    const dispatch = useAppDispatch()
    const {max_peoples, team_amount} = useAppSelector(creatingChallengeSelector)

    const handlerTeamAmount = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(setDataChallenge({
            name: e.target.name,
            value: e.target.value.replace(/\D/, '')
        }))

    const handlerMaxPeoples = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(setDataChallenge({
            name: e.target.name,
            value: e.target.value.replace(/\D/, '')
        }))

    useEffect(() => {
        dispatch(setDisabledButton(!(Number(max_peoples) && Number(team_amount))))
    }, [max_peoples, team_amount])

    return (
        <div className={'creating-commands-challenge'}>
            <div className='creating-commands-challenge__main-title main-title'>
                Команды
            </div>
            <div className='creating-commands-challenge__block'>
                <h1 className='creating-commands-challenge__title'>
                    Количество команд
                </h1>
                <input
                    type='number'
                    className='_field'
                    onChange={handlerTeamAmount}
                    value={team_amount}
                    name={'team_amount' as KeysCreatingChallenge}
                />
            </div>
            <div className='creating-commands-challenge__block'>
                <h1 className='creating-commands-challenge__title'>
                    Участников на команду
                </h1>
                <input
                    type='number'
                    className='_field'
                    onChange={handlerMaxPeoples}
                    value={max_peoples}
                    name={'max_peoples' as KeysCreatingChallenge}
                />
            </div>
        </div>
    )
}
