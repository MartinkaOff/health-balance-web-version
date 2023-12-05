import React, {ChangeEvent, forwardRef, useEffect, useState} from 'react'
import './creating-challenge.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {creatingChallengeSelector, setDataChallenge} from '../../Redux/slice/challengeSlice'
import icon_edit from '../../assets/image/icon-edit.svg'
import icon_camera from '../../assets/image/icon-camera-add.svg'
import icon_clock from '../../assets/image/Interesting/clock.svg'
import {definitionColor, extractContent, regexInput} from '../../utils/common-functions'
import {RewardCount} from '../Reward/Reward-count'
import ReactDatePicker, {registerLocale} from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import {creatingPurposeSelector, setPurposeChallenge} from '../../Redux/slice/purposeSlice'
import {useLoadImage} from '../../hooks/useLoadImage'
import {typeImage, typesChallenge} from '../../utils/enums'
import ReactQuill from 'react-quill'
import {toolbarOptions} from '../../utils/globalConstants'
import {KeysCreatingChallenge} from "../../models/IChallenge";

registerLocale('ru', ru)

export const FinalVariant = () => {
    const {
        title,
        description,
        type,
        start_date,
        end_date
    } = useAppSelector(creatingChallengeSelector)
    const creatingPurpose = useAppSelector(creatingPurposeSelector)
    const [isEditReward, setIsEditReward] = useState<boolean>(false)
    const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
    const [isEditDescription, setIsEditDescription] = useState<boolean>(false)
    const {image, photoPath, isLoadingAvatar, uploadImage} = useLoadImage()
    const dispatch = useAppDispatch()

    const addCover = async () => await uploadImage(typeImage.challenges)

    useEffect(() => {
        if (image) dispatch(setDataChallenge({
            name: "image" as KeysCreatingChallenge,
            value: image
        }))
    }, [image])

    const changeDate = (dates: any) => {
        const [start, end] = dates
        dispatch(setDataChallenge({
            name: "start_date" as KeysCreatingChallenge,
            value: start
        }))
        dispatch(setDataChallenge({
            name: "end_date" as KeysCreatingChallenge,
            value: end
        }))
    }

    return (
        <div className={'final-variant'}>
            {!isLoadingAvatar ? (
                <div onClick={addCover} className='final-variant__image'>
                    {photoPath && (
                        <img
                            className={'final-variant__image-main'}
                            src={photoPath}
                            alt='image-challenge'
                        />
                    )}
                    {!photoPath && (
                        <div className={'final-variant__text'}>
                            <img src={icon_camera} alt='icon-camera'/>
                            <span>Загрузите обложку</span>
                        </div>
                    )}
                </div>
            ) : (
                <h1 className='final-variant__image'>Загружается...</h1>
            )}
            <div className='final-variant__header'>
                {!isLoadingAvatar ? (
                    <div onClick={addCover} className='final-variant__icon'>
                        {photoPath && <img src={photoPath} alt='image-challenge-small'/>}
                        {!photoPath && (
                            <div className={'final-variant__text'}>
                                <img src={icon_camera} alt='icon-camera-small'/> <br/>
                                <br/>
                                <span>icon</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <h1 className='final-variant__icon'>...</h1>
                )}
                <div className='final-variant__header__info'>
                    <div>
                        <select
                            name={'type' as KeysCreatingChallenge}
                            className={definitionColor(type, 'final-variant__type')}
                            defaultValue={type}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                dispatch(setDataChallenge({
                                    name: e.target.name,
                                    value: +e.target.value
                                }))
                            }
                        >
                            <option value={typesChallenge.personal}>Личный</option>
                            <option value={typesChallenge.command}>Командный</option>
                        </select>
                        <img src={icon_edit} alt='icon-edit type'/>
                    </div>
                    <div className='final-variant__title'>
                        {!isEditTitle && title}
                        {isEditTitle && (
                            <input
                                name={'title' as KeysCreatingChallenge}
                                type='text'
                                value={title}
                                onBlur={() => setIsEditTitle(false)}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    dispatch(setDataChallenge({
                                        name: e.target.name,
                                        value: e.target.value
                                    }))
                                }
                            />
                        )}
                        <img src={icon_edit} alt='icon-edit-title' onClick={() => setIsEditTitle(true)}/>
                    </div>
                </div>
            </div>
            <div className='final-variant__description'>
                {!isEditDescription && <div style={{display: 'flex', alignItems: 'center'}}>
                   <div dangerouslySetInnerHTML={{__html: description}}/>
                   <img
                     src={icon_edit}
                     alt='icon-edit-description'
                     onClick={() => setIsEditDescription(true)}
                   /></div>}
                {isEditDescription && (
                    <ReactQuill
                        style={{marginBottom: 15}}
                        theme="snow"
                        placeholder='Описание'
                        value={description}
                        onChange={(text: string) => extractContent(text).length < 180 && dispatch(setDataChallenge({
                            name: 'description' as KeysCreatingChallenge,
                            value: text
                        }))}
                        modules={{toolbar: toolbarOptions}}
                    />
                )}
            </div>
            <div className='final-variant__row'>
                <ReactDatePicker
                    onChange={changeDate}
                    startDate={start_date as Date}
                    selectsRange
                    endDate={end_date as Date}
                    dateFormat='dd.MM.yyyy'
                    locale={ru}
                    customInput={<ExampleCustomInput/>}
                />
                <div className='final-variant__reward'>
                    <div className='final-variant__reward-text'>Награда:</div>
                    {!isEditReward && <RewardCount count={creatingPurpose.reward}/>}
                    {isEditReward && (
                        <input
                            type={'text'}
                            name={'reward'}
                            value={creatingPurpose.reward}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                regexInput(e)
                                dispatch(setPurposeChallenge({
                                    name: e.target.name,
                                    value: +e.target.value
                                }))
                            }
                            }
                            onBlur={() => setIsEditReward((prev) => !prev)}
                        />
                    )}
                    <img
                        src={icon_edit}
                        alt='icon-edit-reward'
                        onClick={() => setIsEditReward((prev) => !prev)}
                    />
                </div>
            </div>
        </div>
    )
}

const ExampleCustomInput = forwardRef(({value, onClick}: any, ref: any) => {
    const {type} = useAppSelector(creatingChallengeSelector)
    return (
        <div className={definitionColor(type, 'final-variant__data')}>
            <img className={'final-variant__data-clock'} src={icon_clock} alt=''/>
            {value}
            <img
                className={'final-variant__data-edit'}
                src={icon_edit}
                alt=''
                onClick={onClick}
                ref={ref}
            />
        </div>
    )
})
