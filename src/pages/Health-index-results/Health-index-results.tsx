import { CardBiologyAge } from '../../Components/Health-index-result/Card-biology-age'
import { CardDisease } from '../../Components/Health-index-result/Card-Disease'
import { Link } from 'react-router-dom'
import { CardIndex } from '../../Components/Health-index-result/Card-index'
import './health-index-results.scss'
import { NavigationComponent } from '../../Components/Navigation/Navigation-component'
import { Retesting } from '../../Components/Health-index-result/Retesting'
import {
  DYNAMICS_ROUTE,
  INDIVIDUAL_REPORT_ROUTE
} from '../../provider/constants-route'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { timeConverterUnix } from '../../utils/common-functions'
import React from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import {
  currentResultIndexSelector,
  indicatorsSelector,
  riskOfDiseasesSelector
} from '../../Redux/slice/healthIndexSlice'
import HeaderActive from '../../Components/Header-active/Header-active'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../assets/style/swiper.scss'

import { Pagination, Navigation } from 'swiper';

export const HealthIndexResults = () => {
  const currentResultIndex = useAppSelector(currentResultIndexSelector)
  const indicators = useAppSelector(indicatorsSelector)
  const riskOfDiseases = useAppSelector(riskOfDiseasesSelector)
  const check =
    currentResultIndex &&
    (timeConverterUnix(new Date().toLocaleDateString()) -
      currentResultIndex.date) /
    (24 * 60 * 60) >=
    180.0

  return (
    <div className={'health-index-results-page'}>
      <NavigationComponent />
      <HeaderActive />
      <HeaderTwo title={'Индексы здоровья'} marginBottom={42} />
      <div className="health-index-results-page__wrapper-main">
        {currentResultIndex && (
          <>
            {check && (
              <div className='health-index-results-page__retesting'>
                <Retesting />
              </div>
            )}
            <div className='health-index-results-page__block'>
              <div className='health-index-results-page__age'>
                <CardBiologyAge age={currentResultIndex?.biological_age} />
              </div>
              <div className='health-index-results-page__indicators'>
                <div className="health-index-results-page__indicators-header">
                  <div className='health-index-results-page__title title-17'>
                    Показатели
                  </div>
                  <Link
                    to={DYNAMICS_ROUTE}
                    className='health-index-results-page__link _button-dark'
                  >
                    Динамика всех показателей
                  </Link>
                </div>
                <div className='health-index-results-page__index'>
                  {indicators?.map((item, index) => (
                    <div
                      className='health-index-results-page__index-item'
                      key={index}
                    >
                      <CardIndex
                        title={item.title}
                        value={item.value || 0}
                        tag={item.tag}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='health-index-results-page__disease'>
              <div className="health-index-results-page__disease-header">
                <div className='health-index-results-page__title title-17'>
                  Риски возникновения заболеваний
                </div>
                <Link
                  to={INDIVIDUAL_REPORT_ROUTE}
                  className='health-index-results-page__link _button-dark'
                >
                  Изучите отчет
                </Link>
              </div>

              <div className="health-index-results-page__disease-wrapper">
                {window.innerWidth > 768 ?
                  riskOfDiseases?.map((item, index) => (
                    <CardDisease
                      risk={item?.value || 0}
                      title={item?.title}
                      tag={item.tag}
                    />
                  )) :
                  <Swiper className='activity-page__actual-items'
                    pagination={{
                      type: 'progressbar',
                    }}
                    modules={[Pagination]}
                    slidesPerView={3}
                    spaceBetween={10}
                    style={{ height: "119px" }}>

                    {riskOfDiseases?.map((item, index) => (
                      <SwiperSlide
                        className='health-index-results-page__disease-item'
                        key={index}
                      >
                        <CardDisease
                          risk={item?.value || 0}
                          title={item?.title}
                          tag={item.tag}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
