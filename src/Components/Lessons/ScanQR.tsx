import React, {useEffect, useState} from 'react'
import {QrReader} from 'react-qr-reader'
import '../Lecture/lecture.scss'
import {ModalSuccess} from '../Modals/Modal-success'
import {showToast} from '../../utils/common-functions'
import {useCheckTaskQuery, useCompleteLessonMutation, useGetLessonByIdQuery} from '../../services/lessons.api'
import {useParams} from "react-router-dom";
import {errorHandler} from "../../utils/errorsHandler";
import {Preloader} from "../Preloader/Preloader";


export const ScanQR = () => {
    const params = useParams()

    const {data: lesson} = useGetLessonByIdQuery(Number(params.id))
    const {data: checkTask, isLoading: isLoadingCheckTask} = useCheckTaskQuery(Number(params.id))
    const [completeLesson, {isLoading}] = useCompleteLessonMutation()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [startScan, setStartScan] = useState<boolean>(false)
    const [data, setData] = useState<string>('')

    useEffect(() => {
        if (data) checkQRCode()
    }, [data])

    const checkQRCode = async () => {
        if (data === lesson?.qr_code && lesson?.id) {
            try {
                const dataTaskToCompleted = {
                    answer: data
                }
                const response = await completeLesson({
                        dataTaskToCompleted,
                        id: lesson.id
                    }
                ).unwrap()
                if (response.success) {
                    setShowModal(true)
                    setData('')
                }
            } catch (error) {
                await errorHandler(error)
            }
        } else await showToast('Сканированный код не соответствует требуемому')
    }


    if (showModal) {
        return (
            <ModalSuccess
                setShowModal={setShowModal}
                showModal={showModal}
                updateActive={true}
                reward={lesson?.score}
            />
        )
    }

    if (checkTask?.exist)
        return <h1 style={{textAlign: 'center', color: 'red'}}>Выполнено</h1>

    if (startScan) {
        return (
            <QrReader
                scanDelay={0}
                onResult={(result, error) => {
                    if (!!result) setData(result.getText())
                    if (!!error) console.info(error)
                }}
                containerStyle={{width: '100%'}}
                constraints={{facingMode: 'environment'}}
            />
        )
    }
    if(isLoadingCheckTask) return <Preloader height={'auto'}/>
    return (
        <>
            <button
                className='task-lecture__button-execute _button-white'
                onClick={() => setStartScan(true)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
                ) : (
                    'Сканировать QR'
                )}
            </button>
        </>
    )
}
