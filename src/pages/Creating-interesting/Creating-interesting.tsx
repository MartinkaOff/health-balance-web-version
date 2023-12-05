import React, {useEffect, useState} from 'react'
import './creating-interesting.scss'
import Header from '../../Components/Header/Header'
import paper_clip from '../../assets/image/icon-paper-clip.svg'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {
    creatingNewsSelector,
    handlerNews,
    previewImageSelector,
    resetDataNews,
    setPreviewImage,
} from '../../Redux/slice/newsSlice'
import {Link} from 'react-router-dom'
import {INTERESTING_ROUTE, RUBRIC_ROUTE} from '../../provider/constants-route'
import {ModalStatus} from '../../Components/Modals/Modal-status'
import {rubricConversion, showToast} from '../../utils/common-functions'
import {useCreateNewsMutation} from '../../services/news.api'
import {useLoadImage} from '../../hooks/useLoadImage'
import {typeImage} from '../../utils/enums'
import {errorHandler} from "../../utils/errorsHandler";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useChallengesShortsQuery, useChallengeTeamsShortsQuery} from "../../services/ChallengeService";
import {KeysCreatingNews} from "../../models/INews";
import {useGetCurrentPlatformQuery} from "../../services/platform.api";


export const CreatingInteresting = () => {

    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState<boolean>(false)
    const dataNews = useAppSelector(creatingNewsSelector)
    const previewImage = useAppSelector(previewImageSelector)
    const [creatingNews, {isLoading}] = useCreateNewsMutation()
    const {data: platform} = useGetCurrentPlatformQuery()
    const {data: challengesShorts} = useChallengesShortsQuery(platform?.data.id || 0,{
        skip: !platform?.data.id
    })
    const {data: challengeTeamsShorts} = useChallengeTeamsShortsQuery(dataNews.challenge || 0,{
        skip: !dataNews.challenge
    })
    const {image, photoPath, isLoadingAvatar, clearImages, uploadImage} =
        useLoadImage()

    const takePicture = async () => await uploadImage(typeImage.news)

    const handlerForm = (name: KeysCreatingNews, value: number | string) => dispatch(handlerNews({name, value}))

    const publish = async () => {
        if (
            !dataNews.title &&
            !dataNews.annotation &&
            !dataNews.category &&
            !dataNews.content
        ) {
            await showToast('Вы заполнили не все поля!')
            return
        }
        const requestBody = {...dataNews}
        if (!requestBody.team) delete requestBody.team
        if (!requestBody.challenge) delete requestBody.challenge
        await creatingNews(requestBody)
            .unwrap()
            .then((response) => {
                if (response.news_id) {
                    reset()
                    clearImages()
                    setShowModal(true)
                }
            })
            .catch(e => errorHandler(e))
    }

    const reset = () => dispatch(resetDataNews())

    useEffect(() => {
        if (image) {
            dispatch(handlerNews({name: 'image', value: image}))
            dispatch(setPreviewImage(photoPath))
        }
    }, [image])

    useEffect(() => {
        if(!challengeTeamsShorts?.length) dispatch(handlerNews({name: 'team', value: 0}))
    }, [dataNews.challenge]);

    if (showModal) return <ModalStatus route={INTERESTING_ROUTE}/>

    return (
        <div className={'creating-interesting'}>
            <Header title={'Добавить интересное'}/>
            <div className='creating-interesting__container'>
                <div className='creating-interesting__fields'>
                    <input
                        type='text'
                        className='creating-interesting__field'
                        placeholder={'Введите заголовок записи...'}
                        value={dataNews.title}
                        onChange={(e) => handlerForm('title', e.target.value)}
                        required
                    />
                    <input
                        type='text'
                        className='creating-interesting__field'
                        placeholder={'Введите аннотацию...'}
                        onChange={(e) => handlerForm('annotation', e.target.value)}
                        value={dataNews.annotation}
                        required
                    />
                    <textarea
                        className='creating-interesting__field'
                        placeholder={'Введите текст записи...'}
                        onChange={(e) => handlerForm('content', e.target.value)}
                        value={dataNews.content}
                    />
                </div>
                <div className='creating-interesting__row'>
                    {!isLoadingAvatar ? (
                        <div
                            onClick={takePicture}
                            className='creating-interesting__cover text-blue'
                        >
                            <img src={paper_clip} alt=''/>
                            Загрузить обложку
                        </div>
                    ) : (
                        <h1 className='creating-interesting__cover'>Загружается...</h1>
                    )}
                    <Link
                        to={RUBRIC_ROUTE}
                        className='creating-interesting__category text-blue'
                    >
                        Рубрика
                    </Link>
                    <div style={{marginLeft: 20}}>
                        {rubricConversion(dataNews.category)}
                    </div>
                </div>
                {previewImage && (
                    <div className='creating-interesting__row'>
                        <img
                            className='creating-interesting__cover-image'
                            src={previewImage}
                            alt='cover'
                        />
                    </div>
                )}
                <div className={'creating-interesting__calendar'}>
                    <DatePicker
                        onChange={(date) => handlerForm('created_at', moment(date).unix())}
                        inline
                        minDate={new Date()}
                        startDate={new Date()}
                        selected={moment(dataNews.created_at * 1000).toDate()}
                        showTimeInput
                        timeInputLabel={'Время'}
                        dateFormat='dd.MM.yyyy'
                        locale={ru}
                    />
                </div>
                <div className="creating-interesting__select-challenge _custom-select">
                    <select
                        defaultValue={dataNews.challenge === 0 ? 'DEFAULT' : dataNews.challenge}
                        onChange={(e) => handlerForm('challenge', +e.target.value)}
                    >
                        <option value={'DEFAULT'} disabled>
                            Челлендж
                        </option>
                        {challengesShorts?.map((challenge) => (
                            <option value={challenge.id} key={challenge.id}>
                                {challenge.title}
                            </option>
                        ))}
                    </select>
                </div>
                {!!(dataNews.challenge && challengeTeamsShorts?.length) && <div className="creating-interesting__select-challenge-teams _custom-select">
                    <select
                        defaultValue={dataNews.team === 0 ? 'DEFAULT' : dataNews.team}
                        onChange={(e) => handlerForm('team', +e.target.value)}
                    >
                        <option value={'DEFAULT'} disabled>
                            Команда
                        </option>
                        {challengeTeamsShorts?.map((challenge) => (
                            <option value={challenge.id} key={challenge.id}>
                                {challenge.title}
                            </option>
                        ))}
                    </select>
                </div>}
                <div className='creating-interesting__push'>
                    <div className='custom-checkbox'>
                        <input
                            type='checkbox'
                            className='custom-checkbox__checkbox'
                            id={'push'}
                            checked={dataNews.push === 1}
                            onChange={(e) => handlerForm('push', +e.target.checked)}
                        />
                        <label htmlFor='push'>Отправить PUSH</label>
                    </div>
                </div>
                <button
                    className={'creating-interesting__button _button-white'}
                    disabled={isLoading}
                    onClick={publish}
                >
                    {isLoading ? (
                        <span className='spinner'>
              <i className='fa fa-spinner fa-spin'></i> Загрузка
            </span>
                    ) : (
                        'Опубликовать'
                    )}
                </button>
            </div>
        </div>
    )
}
