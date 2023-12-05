import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {creatingChallengeSelector, setDataChallenge, setDisabledButton} from '../../Redux/slice/challengeSlice'
import './creating-challenge.scss'
import ReactQuill from 'react-quill'
import {toolbarOptions} from '../../utils/globalConstants'
import {extractContent} from '../../utils/common-functions'
import {KeysCreatingChallenge} from "../../models/IChallenge";

export const CreatingDescriptionChallenge = () => {
    const dispatch = useAppDispatch()
    const {description} = useAppSelector(creatingChallengeSelector)
    const acceptableTextLength = extractContent(description).length >= 3 && extractContent(description).length <= 180

    const handlerDescription = (text: string) =>
        dispatch(setDataChallenge({
            name: 'description' as KeysCreatingChallenge,
            value: text
        }))

    useEffect(() => {
        dispatch(setDisabledButton(!acceptableTextLength))
    }, [description])

    return (
        <div className={'creating-description-challenge'}>
            <div className='creating-description-challenge__title main-title'>
                Краткое описание
            </div>
            <ReactQuill
                style={{marginBottom: 15}}
                theme="snow"
                placeholder='Описание'
                value={description}
                onChange={handlerDescription}
                modules={{toolbar: toolbarOptions}}
            />
            <div className='creating-description-challenge__note small-text'>
                {extractContent(description).length}/180
            </div>
        </div>
    )
}
