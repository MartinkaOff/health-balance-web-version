import React from 'react'
import { NavigationComponent } from '../../Components/Navigation/Navigation-component'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { CardsInteresting } from '../../Components/Interesting/Cards-interesting'
import './interesting-page.scss'
import { useAppSelector } from '../../hooks/redux-hooks'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { CREATING_INTERESTING_ROUTE } from '../../provider/constants-route'
import { NavLink } from 'react-router-dom'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { CATEGORY_NEWS } from '../../utils/globalConstants'
import { PullToRefresh } from "../../Components/PullToRefresh/PulltoRefresh";
import { useGetNewsByCategoryQuery } from "../../services/news.api";
import { CardActual } from '../../Components/Card-actual/Card-actual'
import { actualImage } from '../../assets/image/actual/actualImage'
import HeaderActive from '../../Components/Header-active/Header-active'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../assets/style/swiper.scss'

import { Pagination, Navigation } from 'swiper';


export const InterestingPage = () => {

    const dataUser = useAppSelector(dataUserSelector)
    const [value, setValue] = React.useState<number>(0)
    const idCategory = CATEGORY_NEWS[value].id

    const { refetch } = useGetNewsByCategoryQuery(idCategory)

    async function handleRefresh() {
        refetch()
    }

    return (
        <div>
            <HeaderActive />
            <div className={'interesting-page'}>
                <PullToRefresh onTrigger={handleRefresh} />
                <HeaderTwo title={'Интересное'} marginBottom={20} />
                <div className="interesting-page__wrapper">
                    <div className="interesting-page__header-wrapper">
                        <div className='activity-page__actual activity-page__actual-interesting'>
                            <Swiper className='activity-page__actual-items'
                                pagination={{
                                    type: 'progressbar',
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                slidesPerView={6}
                                spaceBetween={30}
                               /*  pagination={{
                                    clickable: true,
                                    bulletClass: 'dynamic-bullet',
                                    bulletActiveClass: 'dynamic-bullet_active',
                                    modifierClass: 'mod'
                                }} */>
                                <SwiperSlide className='swiper-slide'>
                                    <CardActual
                                        title='Как начать сегодня?'
                                        path='/'
                                        image={actualImage.how_to_start}
                                        type='Опрос' />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <CardActual
                                        title='Ежемесячный забег поддержки'
                                        path='/'
                                        image={actualImage.support}
                                        type='Челлендж' />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <CardActual
                                        title='Как пользоваться приложением'
                                        path='/'
                                        image={actualImage.guide}
                                        type='Интересное' />
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <>
                            {(dataUser.role === 1 || dataUser.role === 2) && (
                                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <NavLink to={CREATING_INTERESTING_ROUTE} className='_button-yellow'>
                                        Добавить интересное
                                    </NavLink>
                                </div>
                            )}
                            <div className='interesting-page__tabs'>
                                <Tabs
                                    labels={CATEGORY_NEWS.map(item => item.title)}
                                    onClick={setValue}
                                    value={value}
                                    customClassChildren={'scroll-tabs-labels'}
                                    customClassParent={'scroll-tabs'}
                                />
                                {
                                    CATEGORY_NEWS.map((label, i) => (
                                        <TabContent index={i} value={value} key={i}>
                                            <div className="interesting-page__cards">
                                                <CardsInteresting idCategory={label.id} key={i} />
                                            </div>
                                        </TabContent>
                                    ))
                                }
                            </div>
                        </>
                    </div>
                </div>
                <NavigationComponent />

            </div>
        </div>

    )
}
