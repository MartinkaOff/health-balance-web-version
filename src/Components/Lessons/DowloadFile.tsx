import React, {ChangeEvent, useState} from 'react'
import {useCheckTaskQuery, useCompleteLessonMutation, useGetLessonByIdQuery} from '../../services/lessons.api'
import {showToast} from '../../utils/common-functions'
import {ModalSuccess} from '../Modals/Modal-success'
import {Preloader} from '../Preloader/Preloader'

import '../Lecture/lecture.scss'
import {useParams} from "react-router-dom";
import {errorHandler} from "../../utils/errorsHandler";

export const DownloadFile = () => {
    const params = useParams()

    const {data: lesson} = useGetLessonByIdQuery(Number(params.id))
    const {data: checkTask, isLoading: isLoadingCheckTask} = useCheckTaskQuery(Number(params.id))
    const [completeLesson, {isLoading}] = useCompleteLessonMutation()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [downloadFile, setDownloadFile] = useState<string>('')
    const [selectedName, setSelectedName] = useState<string>('')
    const [imagePreview, setImagePreview] = useState<string>('')

    function getFileReader(): FileReader {
        const fileReader = new FileReader();
        const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
        return zoneOriginalInstance || fileReader;
    }

    const download = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            let newInstance = getFileReader();
            newInstance.readAsDataURL(e.target.files[0]);
            newInstance.onload = (imgSrc) => {
                let url = (imgSrc.target as FileReader).result;
                setDownloadFile(url as string)
                if (e.target.files[0].type.includes('image')) {
                    setImagePreview(url as string)
                    setSelectedName('')
                    return
                }
                setImagePreview('')
                setSelectedName(e.target.files[0].name)
            }
        }
    }


    //   const download = (e: any) => {
    //   const reader = new FileReader()
    //   const selectedFile: any = e.target.files[0]
    //   if (selectedFile) reader.readAsDataURL(selectedFile)
    //   reader.onload = (readerEvent: any) => {
    //     setDownloadFile(selectedFile)
    //     if (selectedFile.type.includes('image')) {
    //       setImagePreview(readerEvent.target.result)
    //       setSelectedName('')
    //       return
    //     }
    //     setImagePreview('')
    //     setSelectedName(selectedFile.name)
    //   }
    // }

    const complete = async () => {
        if (downloadFile && lesson) {
            try {
                const dataTaskToCompleted = {
                    file: downloadFile
                }
                const response = await completeLesson({
                        dataTaskToCompleted,
                        id: lesson.id
                    }
                ).unwrap()
                if (response.success) setShowModal(true)
            } catch (error) {
                await errorHandler(error)
            }
        } else {
            await showToast('Вы неправильно выполнили задание')
        }
    }


    if (isLoadingCheckTask) return <Preloader height='auto'/>

    if (showModal) {
        return (
            <ModalSuccess
                // route={LECTURES_ROUTE + '/' + challengeId?.id}
                setShowModal={setShowModal}
                showModal={showModal}
                updateActive={true}
                reward={lesson?.score}
            />
        )
    }

    if (checkTask?.exist)
        return <h1 style={{textAlign: 'center', color: 'red'}}>Выполнено</h1>

    return (
        <>
            <div className='task-lecture__title title-17'>Загрузите файл</div>
            <input
                id='file'
                type='file'
                className='creating-lecture__description'
                onChange={download}
            />
            <label
                htmlFor='file'
                className='task-lecture__button-download _button-dark-yellow'
            >
                Загрузить
            </label>
            {selectedName && (
                <div style={{marginBottom: 30}}>
                    <h3> {selectedName}</h3>
                </div>
            )}
            {imagePreview && (
                <div className='task-lecture__preview-photo'>
                    <img src={imagePreview} alt=''/>
                </div>
            )}
            <button
                className={
                    downloadFile
                        ? 'task-lecture__button-execute _button-white'
                        : 'task-lecture__button-execute _button-white disabled'
                }
                disabled={isLoading || !downloadFile}
                onClick={complete}
            >
                {isLoading ? (
                    <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
                ) : (
                    'Выполнить'
                )}
            </button>
        </>
    )
}
