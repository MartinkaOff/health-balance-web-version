import { useState } from 'react'
import { A11y, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import icon_dream from '../../assets/image/tracker/icon-dream.svg'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'
import './tracker.scss'
import {
  getItemsHour,
  getItemsMinutes,
  getItemsWeight
} from '../../utils/common-functions'
import { TrackerHabitsPage } from '../Tracker-habits/Tracker-habits-page'
import { useAppSelector } from '../../hooks/redux-hooks'
import { useGetTrackerQuery } from '../../services/tracker.api'
import { Capacitor } from '@capacitor/core'
import { heightStatusBarSelector } from '../../Redux/slice/appSlice'
import { Preloader } from '../../Components/Preloader/Preloader'
import { SlideNextButton } from '../../Components/Tracker/SlideNextButton'

export const TrackerPage = () => {
  const startValueWeight = 40
  const endValueWeight = 200
  const itemsWeight = getItemsWeight(startValueWeight, endValueWeight, 'кг')
  const [weightUser, setWeightUser] = useState<string>('80')
  const [countFruits, setCountFruits] = useState<number>(0)

  const changeWeight = (value: string) => setWeightUser(value)
  const addCountFruits = () => setCountFruits((prev) => prev + 1)
  const decreaseCountFruits = () => {
    if (countFruits > 0) {
      setCountFruits((prev) => prev - 1)
    }
  }

  const itemsHour = getItemsHour()
  const itemsMinutes = getItemsMinutes()
  const [hour, setHour] = useState<string>('7')
  const [minutes, setMinutes] = useState<string>('00')

  const statusBar = useAppSelector(heightStatusBarSelector)

  const changeHour = (value: string) => setHour(value)
  const changeMinutes = (value: string) => setMinutes(value)

  const { data: tracker, isLoading } = useGetTrackerQuery(undefined)

  if (isLoading) {
    return <Preloader />
  }
  if (tracker?.id) {
    return <TrackerHabitsPage />
  }

  return (
    <div
      className={'tracker'}
      style={{
        margin:
          Capacitor.getPlatform() === 'ios'
            ? `-${statusBar}px -16px -16px -16px`
            : '-16px'
      }}
    >
      <Swiper
        modules={[Pagination, A11y]}
        className={'preview__swiper'}
        slidesPerView={1}
        pagination={{ clickable: true }}
        spaceBetween={50}
      >
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__title tracker__title_start title-35'>
              Это трекер <br /> полезных превычек
            </div>
            <div className='tracker__text'>
              Здесь мы будем приучаться хорошо спать, правильно пить воду и есть
              фрукты/овощи
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__icon'>
              <img src={icon_dream} alt='dream' />
            </div>
            <div className='tracker__sub-text-icon small-text'>
              Здоровый сон
            </div>
            <div className='tracker__title title-35'>
              Во сколько вы просыпаетесь?
            </div>

            <div className='tracker__clocks'>
              <div className='tracker__clocks-item'>
                <ScrollPicker
                  onChange={changeHour}
                  items={itemsHour}
                  value={hour}
                  totalHeight={77}
                  size={1}
                  customClassname={'clock'}
                  fontSize={44}
                />
              </div>
              <div className={''}>:</div>
              <div className='tracker__clocks-item'>
                <ScrollPicker
                  onChange={changeMinutes}
                  items={itemsMinutes}
                  value={minutes}
                  size={1}
                  totalHeight={77}
                  fontSize={44}
                  customClassname={'clock'}
                />
              </div>
            </div>

            <div className='tracker__recommendation small-text'>
              Оптимальное время засыпания:{' '}
              <span className='text-blue'>
                {(+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8)
                  .toString()
                  .padStart(2, '0')}{' '}
                :{minutes.padStart(2, '0')}
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__icon'>
              <img src={icon_water} alt='dream' />
            </div>
            <div className='tracker__sub-text-icon small-text'>
              Водный баланс
            </div>
            <div className='tracker__title title-35'>Ваш текущий вес</div>
            <div className='tracker__weight'>
              <ScrollPicker
                onChange={changeWeight}
                items={itemsWeight}
                value={weightUser}
              />
            </div>
            <div className='tracker__recommendation small-text'>
              Количество воды в день:{' '}
              <span className='text-blue'>
                {((+weightUser * 35) / 1000).toFixed(1)} литра
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__icon'>
              <img src={icon_fruit} alt='dream' />
            </div>
            <div className='tracker__sub-text-icon small-text'>
              Фрукты и овощи
            </div>
            <div className='tracker__title title-35'>Фрукты и овощи</div>
            <div className='tracker__clocks digits'>
              <div onClick={decreaseCountFruits}>-</div>
              <div className='digits__square'>
                {countFruits >= 10 ? countFruits : '0' + countFruits}
              </div>
              <div onClick={addCountFruits}>+</div>
            </div>
            <div className='tracker__recommendation small-text'>
              Количество фруктов в день{' '}
              <span className='text-blue'>5 оптимально</span>
            </div>
          </div>
        </SwiperSlide>
        <SlideNextButton
          customClass={'preview__button _button-dark'}
          fruits={JSON.stringify(countFruits)}
          wake_up_time={hour.padStart(2, '0') + ':' + minutes.padStart(2, '0')}
          weight={weightUser}
        />
        <div className={'circle-gradient circle-gradient_green'} />
      </Swiper>
    </div>
  )
}
