import React, {useEffect} from 'react'
import './creating-challenge.scss'
import icon_reward from '../../assets/image/icon_reward.svg'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {creatingPurposeSelector, setPurposeChallenge} from '../../Redux/slice/purposeSlice'
import {creatingChallengeSelector, setDisabledButton} from '../../Redux/slice/challengeSlice'
import {nFormatter, sklonenie} from '../../utils/common-functions'
import {typesChallenge} from "../../utils/enums";

export const CreatingTargets = () => {

    const {type} = useAppSelector(creatingChallengeSelector)
    const {quantity, reward} = useAppSelector(creatingPurposeSelector)
    const minReward = 0
    const maxReward = type === typesChallenge.personal ? 200 : 500
    const minDistance = 0
    const maxDistance = type === typesChallenge.personal ? 500000 : 10000000
    const quantityText = `${nFormatter(quantity, 1)} ${sklonenie(quantity, ['шаг', 'шага', 'шагов'])}`

    const dispatch = useAppDispatch()

    const handlerTargetRange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setPurposeChallenge({
            name: e.target.name,
            value: +e.target.value
        }))

    const handlerRewardRange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setPurposeChallenge({
            name: e.target.name,
            value: +e.target.value
        }))

    useEffect(() => {
        dispatch(setDisabledButton(!(reward && quantity)))
    }, [quantity, reward])

    return (
        <div className={'targets'}>
            <div className='targets__top-block'>
                <div className='targets__title creating-title'>Цели</div>
            </div>
            <div className='targets__block'>
                <div className='targets__choice choice-target'>
                    <div className='choice-target__head'>
                        <div className='choice-target__sub-title creating-sub-title'>
                            Цель челленджа
                        </div>
                        <div className='choice-target__value creating-title'>
                            {quantityText}
                        </div>
                    </div>
                    <input
                        name={'quantity'}
                        min={minDistance}
                        max={maxDistance}
                        type='range'
                        className={'choice-target__range '}
                        value={quantity}
                        onChange={handlerTargetRange}
                        style={{
                            backgroundImage: `linear-gradient( to right, #F2994A, 
                        #F4C319 ${
                                (100 * +quantity) / maxDistance
                            }%, 
                        #474747 ${
                                (100 * +quantity) / maxDistance
                            }%)`
                        }}
                    />
                </div>

                <div className='targets__title creating-title'>Награда</div>

                <div className='targets__choice-target choice-target'>
                    <div className='choice-target__head'>
                        <div className='choice-target__sub-title creating-sub-title'>
                            Количество <img src={icon_reward} alt='icon reward'/>
                        </div>
                        <div className='choice-target__value creating-title'>
                            {reward}
                        </div>
                    </div>
                    <input
                        name={'reward'}
                        min={minReward}
                        max={maxReward}
                        type='range'
                        className={'choice-target__range green'}
                        value={reward}
                        onChange={handlerRewardRange}
                        style={{
                            backgroundImage: `linear-gradient( to right, #00A62E, 
                        #3CF470 ${
                                (100 * +reward) / maxReward
                            }%, 
                        #474747 ${
                                (100 * +reward) / maxReward
                            }% )`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
