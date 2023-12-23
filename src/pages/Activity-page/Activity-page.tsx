import React, { FC, useEffect, useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'

import { Health } from '@awesome-cordova-plugins/health'
import Pedometer from '../../plugins/pedometer'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import './../../assets/style/pullToRefresh.scss'

import { Steps } from '../../Components/Steps/Steps'
import { NavigationComponent } from '../../Components/Navigation/Navigation-component'
import './activity-page.scss'
import { StepsData } from '../../Components/Steps-data/Steps-data'
import HeaderActive from '../../Components/Header-active/Header-active'
import Target from '../../Components/Target/Target'
import { TopRating } from '../../Components/Top-rating/Top-rating'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { purposeSelector } from '../../Redux/slice/purposeSlice'
import {
  currentStepsCountSelector,
  getBalance,
  getStepsPerDay,
  getStepsPerMonth,
  getStepsPerWeek,
  setCurrentStepsCount,
  setMonths,
  setWeeks,
  stepsPerDaySelector
} from '../../Redux/slice/appSlice'

import { Charts } from '../../Components/Charts/Charts'
import AppService from '../../services/AppService'
import { periodMonth, periodWeek } from '../../Components/Charts/Chart-options'
import { PullToRefresh } from '../../Components/PullToRefresh/PulltoRefresh'
import { leaderboardApi } from '../../services/leaderboard.api'
import moment from 'moment'
import { Banner } from "../../Components/Banner/Banner";
import { pedometerSelector } from "../../Redux/slice/settingsSlice";
import { PEDOMETERS } from "../../utils/enums";
import { showToast } from "../../utils/common-functions";
import { nFormatter } from '../../utils/common-functions'

import { CardActual } from '../../Components/Card-actual/Card-actual';
// import how_to_start from '../../assets/image/actual/how-to-start.png';
import { actualImage } from '../../assets/image/actual/actualImage'

export const ActivityPage: FC = () => {
  const dispatch = useAppDispatch()

  const [transparentHeader, setTransparentHeader] = useState<boolean>(true)

  const interval: { current: NodeJS.Timer | null } = useRef(null)

  const purpose = useAppSelector(purposeSelector)
  const currentStepsCount = useAppSelector(currentStepsCountSelector)
  const pedometer = useAppSelector(pedometerSelector)

  const steps = useAppSelector(stepsPerDaySelector)

  useEffect(() => {
    startPluginFromPlatform()

    window.addEventListener('scroll', function () {
      let scroll = window.pageYOffset
      if (scroll >= 200) {
        setTransparentHeader(false)
      } else {
        setTransparentHeader(true)
      }
    })

    return () => {
      window.removeEventListener('stepEvent', updateSteps)
      clearInterval(interval.current as NodeJS.Timeout)
    }
  }, [])

  const startPluginFromPlatform = async () => {
    if (Capacitor.getPlatform() === 'android') {
      if (pedometer === PEDOMETERS.googleFit) authGoogleFit()
      else if (pedometer === PEDOMETERS.healthBalance) startPlugin()
    } else if (Capacitor.getPlatform() === 'ios') {
      await startHealthKit()
    }
  }

  const authGoogleFit = async () => {
    // запрос на авторизацию для отправки шагов
    Health.isAvailable()
      .then((available) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => {
              Health.promptInstallFit().then(() => {
                getStepsHistory()
              })
            })
            .catch((error) => console.log(error))
        } else {
          showToast(`Чтобы ваши шаги считались корректно, установите приложение Google fit, 
            создайте аккаунт и синхронизируйте его с приложением`, 'long')
        }
      })
      .catch((error) => console.log(error))
  }

  const startPlugin = async () => {
    let savedData = await Pedometer.getSavedData()
    let steps = savedData['numberOfSteps'] || '0'

    dispatch(setCurrentStepsCount(steps))

    window.addEventListener('stepEvent', updateSteps)
  }

  const updateSteps = async (event: any) => {
    dispatch(setCurrentStepsCount(parseInt(event.numberOfSteps)))
  }

  const updateStepsPeriod = async (data: any) => {
    const params = new FormData()

    params.append('data', JSON.stringify(data))

    await AppService.updateSteps(params)
    dispatch(setCurrentStepsCount(parseInt(data[data.length - 1].steps)))
  }
  const startHealthKit = async () => {
    // запрос на авторизацию в Apple Health для отправки шагов
    Health.isAvailable()
      .then((available: any) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => getStepsHistory())
            .catch((error: any) => console.error(error))
        }
      })
      .catch((error: any) => console.error(error))
  }

  const getStepsHistory = async () => {
    // каждые 5 секунд запрашиваем изменения шагов
    const id = setInterval(() => {
      // получение данных по шагам за последние 3 месяца
      Health.queryAggregated({
        startDate: subtractMonths(3),
        endDate: new Date(),
        dataType: 'steps',
        bucket: 'day'
      })
        .then((res) => {
          let steps = res.map((item: any) => {
            return {
              date: moment(item.startDate).format('DD.MM.YYYY'),
              steps: item.value.toFixed()
            }
          })

          updateStepsPeriod(steps)
        })
        .catch((e: any) => console.log(e))
    }, 5000)

    interval.current = id
  }

  const subtractMonths = (numOfMonths: number, date = new Date()) => {
    date.setMonth(date.getMonth() - numOfMonths)
    return date
  }

  const getDataCharts = async () => {
    await dispatch(getStepsPerDay())
    await dispatch(getStepsPerMonth(periodWeek))
    await dispatch(getStepsPerWeek(periodMonth))
    dispatch(setMonths())
    dispatch(setWeeks())
  }
  const [updateLeaderboard] = leaderboardApi.endpoints.leaderboard.useLazyQuery()
  const handleRefresh = async () => {
    await dispatch(getBalance())
    await updateLeaderboard(null)
    await getDataCharts()
  }

  const indexWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  return (
    <div className='activity-page'>
      <PullToRefresh onTrigger={handleRefresh} />
      <HeaderActive /* transparent={transparentHeader} */ />
      <NavigationComponent />
      <div className={'activity-page__pull-to-refresh'}>
        <div className='activity-page__wrapper'>
          <div className='activity-page__header'>
            <div>
              <div className="activity-page__steps-title title">Активность сегодня</div>
              <div
                className='activity-page__steps'
                id={'step'}
                style={{ backgroundAttachment: 'fixed' }}
              >
                <Steps
                  maxStepsCount={purpose?.quantity || 0}
                  // userStepsCount={Math.abs(currentStepsCount)}
                  userStepsCount={steps.statistic[indexWeek]?.quantity as unknown as number}
                />

                <div className='activity-page__steps-data'>
                  <StepsData />
                </div>
              </div>
            </div>
            <div className='activity-page__actual'>
              <div className='title'>Актуальное</div>
              <div className='activity-page__actual-items'>
                <CardActual
                  title='Как начать сегодня?'
                  path='/'
                  image={actualImage.how_to_start}
                  type='Опрос' />
                <CardActual
                  title='Ежемесячный забег поддержки'
                  path='/'
                  image={actualImage.support}
                  type='Челлендж' />
                <CardActual
                  title='Как пользоваться приложением'
                  path='/'
                  image={actualImage.guide}
                  type='Интересное' />
              </div>
            </div>
          </div>
          {/* <Banner /> */}
          <div className="activity-page__middle">
            <div className='activity-page__target'>
              <div className='activity-page__title title'>Статистика</div>
              <Target />
            </div>
            <Charts />
          </div>
          {/*<div className='activity-page__important'>*/}
          {/*  <ImportantBlock />*/}

          {/*</div>*/}
          <div className='activity-page__top-rating top-rating'>
            <div className='top-rating__title title'>ТОП сегодня</div>
            <TopRating />
          </div>
        </div>
      </div>
      <div className='circle-gradient circle-gradient_top' />
    </div>
  )
}
