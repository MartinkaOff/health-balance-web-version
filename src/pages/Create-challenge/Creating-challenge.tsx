import React, {useState} from 'react'
import Header from '../../Components/Header/Header'
import {stageCreatingChallenge, typesChallenge} from '../../utils/enums'
import {CreatingChallengeItem} from '../../Components/Creating-challenge/Creating-challenge-item'
import './creating-challenge.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {
    creatingChallengeSelector,
    disableButtonChallengeSelector,
    setDisabledButton
} from '../../Redux/slice/challengeSlice'
import {ModalStatus} from '../../Components/Modals/Modal-status'
import {CREATING_LECTURE_ROUTE} from '../../provider/constants-route'
import {creatingPurposeSelector, resetPurposeChallenge} from '../../Redux/slice/purposeSlice'
import {useCreatingChallengeMutation, useCreatingPurposeMutation} from '../../services/ChallengeService'
import {errorHandler} from "../../utils/errorsHandler";
import moment from "moment";

export const CreatingChallengePage = () => {
    const [order, setOrder] = useState<number>(0)
    const disabledButton = useAppSelector(disableButtonChallengeSelector)
    const dataChallenge = useAppSelector(creatingChallengeSelector)
    const dataPurpose = useAppSelector(creatingPurposeSelector)
    const [creatingChallenge, {isLoading}] = useCreatingChallengeMutation()
    const [creatingPurpose, {isLoading: isLoadingPurpose}] = useCreatingPurposeMutation()
    const dispatch = useAppDispatch()

    const saveChallenge = async () => {
        try {
            //формирование объекта на создание челленджа
            const copyDataChallenge = {...dataChallenge}

            if (dataChallenge.type === typesChallenge.personal) {
                copyDataChallenge.customers = JSON.stringify(copyDataChallenge.customers)
                copyDataChallenge.max_peoples = 0
                copyDataChallenge.team_amount = 0
            }
            else delete copyDataChallenge.customers
            copyDataChallenge.start_date = moment(copyDataChallenge.start_date).format('DD.MM.YYYY')
            copyDataChallenge.end_date = moment(copyDataChallenge.end_date).format('DD.MM.YYYY')

            //отправка запроса на создание челленджа
            const responseCreatingChallenge = await creatingChallenge(copyDataChallenge).unwrap()

            //формирование объекта на создание цели челленджа
            const dataPurposeChallenge = {...dataPurpose}
            dataPurposeChallenge.challenge = responseCreatingChallenge.challenge_id

            //отправка запроса на создание цели челленджа
            await creatingPurpose(dataPurposeChallenge).unwrap()

            //переход на следующую страницу и очищение полей
            setOrder((prev) => prev + 1)
            dispatch(resetPurposeChallenge())

        } catch (error) {
            await errorHandler(error)
        }
    }

    const renderCreatingChallengeItems = () => {

        switch (order) {
            case 0:
                return <CreatingChallengeItem stage={stageCreatingChallenge.platform}/>
            case 1:
                return <CreatingChallengeItem stage={stageCreatingChallenge.type}/>
            case 2:
                return <CreatingChallengeItem stage={stageCreatingChallenge.customers}/>
            case 3:
                return <CreatingChallengeItem stage={stageCreatingChallenge.target}/>
            case 4:
                return <CreatingChallengeItem stage={stageCreatingChallenge.data}/>
            case 5:
                return <CreatingChallengeItem stage={stageCreatingChallenge.title}/>
            case 6:
                return <CreatingChallengeItem stage={stageCreatingChallenge.description}/>
            case 7:
                return <CreatingChallengeItem stage={stageCreatingChallenge.teams}/>
            case 8:
                return <CreatingChallengeItem stage={stageCreatingChallenge.finally}/>
            case 9:
                return (
                    <ModalStatus
                        subTitle='Челлендж появится после проверки модератором'
                        textButton='Ок'
                        route={CREATING_LECTURE_ROUTE + '/0'}
                    />
                )
        }
    }

    return (
        <div className={'creating-challenge-page'}>
            <Header title={'Создание челленджа'}/>
            {renderCreatingChallengeItems()}
            <div className='creating-challenge-page__buttons'>
                {order === 8 && (
                    <button
                        className='creating-challenge-page__button _button-white'
                        onClick={saveChallenge}
                        disabled={isLoading || isLoadingPurpose}
                    >
                        {(isLoading || isLoadingPurpose) ? (
                            <span className='spinner'>
                <i className='fa fa-spinner fa-spin'></i> Загрузка
              </span>
                        ) : (
                            'Сохранить'
                        )}
                    </button>
                )}
                {order < 8 && (
                    <button
                        className={
                            'creating-challenge-page__button _button-white' +
                            (disabledButton ? ' disabled' : '')
                        }
                        disabled={disabledButton}
                        onClick={() => {
                            if (dataChallenge.type === 3 && order === 6) {
                                setOrder((prev) => prev + 2)
                            } else if (dataChallenge.type === 2 && order === 1) {
                                setOrder((prev) => prev + 2)
                            } else {
                                setOrder((prev) => prev + 1)
                            }
                            if (order === 4 || order === 5 || order === 6) {
                                dispatch(setDisabledButton(true))
                            }
                        }}
                    >
                        Далее
                    </button>
                )}
            </div>
        </div>
    )
}
