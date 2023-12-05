import React, {useEffect} from 'react'
import './health-index.scss'
import {HealthIndexResults} from '../Health-index-results/Health-index-results'
import {useAppSelector} from '../../hooks/redux-hooks'
import {idPolleSelector, progressPollSelector} from '../../Redux/slice/healthIndexSlice'
import {Preloader} from '../../Components/Preloader/Preloader'
import {useGetDynamicsQuery, useGetProgressAndIdPollsMutation} from "../../services/healthIndex.api";
import {showToast} from "../../utils/common-functions";
import {ContinueQuestionnaire} from '../../Components/Health-index/ContinueQuestionnaire'
import {StartQuestionnaire} from '../../Components/Health-index/StartQuestionnaire'

export const HealthIndexPage = () => {

    const idPoll = useAppSelector(idPolleSelector)
    const progressPoll = useAppSelector(progressPollSelector)
    const {data: dynamics, isLoading} = useGetDynamicsQuery(null)
    const [getProgress, {}] = useGetProgressAndIdPollsMutation()

    useEffect(() => {
        getProgress(null).unwrap().catch((e) => showToast(e.data))
    }, []);


    if (isLoading) {
        return <Preloader/>
    }

    if (dynamics?.length) {
        if (idPoll && progressPoll) {
            return <ContinueQuestionnaire/>
        }
        return <HealthIndexResults/>
    } else {
        if (idPoll && progressPoll) {
            return <ContinueQuestionnaire/>
        }
        if (idPoll && !progressPoll) {
            return <StartQuestionnaire/>
        }
    }

    return <StartQuestionnaire/>
}