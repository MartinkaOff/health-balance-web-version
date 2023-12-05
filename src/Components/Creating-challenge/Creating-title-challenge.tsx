import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {setDataChallenge, setDisabledButton, creatingChallengeSelector} from '../../Redux/slice/challengeSlice'
import './creating-challenge.scss'
import {KeysCreatingChallenge} from "../../models/IChallenge";

export const CreatingTitleChallenge = () => {
    const dispatch = useAppDispatch()
    const {title} = useAppSelector(creatingChallengeSelector)

    const handlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 65) return
        dispatch(setDataChallenge({
            name: e.target.name,
            value: e.target.value
        }))
    }

    useEffect(() => {
        dispatch(setDisabledButton(title.length < 3))
    }, [title])

    return (
        <div className={'creating-title-challenge'}>
            <div className='creating-title-challenge__title main-title'>Название</div>
            <input
                type='text'
                className='creating-title-challenge__field _field'
                onChange={handlerTitle}
                name={'title' as KeysCreatingChallenge}
                value={title}
            />
            <div className='creating-title-challenge__note small-text'>
                {title.length}/65
            </div>
        </div>
    )
}
