import React, {ChangeEvent, useEffect} from 'react'
import {creatingChallengeSelector, setDataChallenge, setDisabledButton} from '../../Redux/slice/challengeSlice'
import {useGetPlatformsForChallengeQuery} from '../../services/platform.api'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import './creating-challenge.scss'
import {Preloader} from '../Preloader/Preloader'
import {KeysCreatingChallenge} from "../../models/IChallenge";


export const SelectPlatform = () => {

    const dispatch = useAppDispatch()
    const {platform} = useAppSelector(creatingChallengeSelector)
    const {data, isLoading} = useGetPlatformsForChallengeQuery()

    const handlerPlatforms = (e: ChangeEvent<HTMLSelectElement>) =>
        dispatch(setDataChallenge({
            name: e.target.name,
            value: +e.target.value
        }))

    useEffect(() => {
        dispatch(setDisabledButton(!platform))
    }, [platform])


    if (isLoading) return <Preloader height='auto'/>

    return (
        <div className={'select-platform'}>
            <div className='select-platform__title main-title'>
                Выберите платформу
            </div>
            <div className='select-platform__select _custom-select'>
                <select
                    defaultValue={platform === 0 ? 'DEFAULT' : platform}
                    onChange={handlerPlatforms}
                    name={'platform' as KeysCreatingChallenge}
                >
                    <option value={'DEFAULT'} disabled>
                        Ваша платформа
                    </option>
                    {data?.data.map((platform) => (
                        <option value={platform.id} key={platform.id}>
                            {platform.title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
