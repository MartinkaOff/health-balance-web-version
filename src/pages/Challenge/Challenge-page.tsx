import React from 'react'
import { NavigationComponent } from '../../Components/Navigation/Navigation-component'
import { CardChallenge } from '../../Components/Challenge/Card-challenge'
import { NewChallengeCard } from '../../Components/Challenge/New-challenge-card'
import './challenge-page.scss'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { useAppSelector } from '../../hooks/redux-hooks'
import { Link } from 'react-router-dom'
import { CREATING_CHALLENGE_ROUTE } from '../../provider/constants-route'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { Preloader } from '../../Components/Preloader/Preloader'
import { Platform } from '../../Components/Platform/Platform'
import { PullToRefresh } from "../../Components/PullToRefresh/PulltoRefresh";
import { useGetChallengesQuery } from '../../services/ChallengeService'
import HeaderActive from '../../Components/Header-active/Header-active';


export const ChallengePage = () => {
    const [valueTab, setValueTab] = React.useState<number>(0)
    const labelsTabChallenge = ['Все', 'Общие', 'Командные', 'Личные']
    const dataUser = useAppSelector(dataUserSelector)

    const { data: allChallenges, isLoading, refetch } = useGetChallengesQuery(null)

    const handleRefresh = async () => refetch()

    const contentTabs = [
        {
            newChallenges: allChallenges?.newChallenges.all,
            activeChallenges: allChallenges?.activeChallenges.all,
        },
        {
            newChallenges: allChallenges?.newChallenges.common,
            activeChallenges: allChallenges?.activeChallenges.common,
        },
        {
            newChallenges: allChallenges?.newChallenges.command,
            activeChallenges: allChallenges?.activeChallenges.command,
        },
        {
            newChallenges: allChallenges?.newChallenges.personal,
            activeChallenges: allChallenges?.activeChallenges.personal,
        },
    ]

    return (
        <div className={'challenge-page'}>
            <HeaderActive />
            <PullToRefresh onTrigger={handleRefresh} />
            <HeaderTwo title={'Челленджи'} marginBottom={40} />
            {
                isLoading ? <Preloader height={'auto'} /> :
                    <div className='challenge-page__wrapper' style={{ position: "relative" }}>
                        <div>
                            {(dataUser.role === 1 || dataUser.role === 2) && (
                                <Link
                                    to={CREATING_CHALLENGE_ROUTE}
                                    className='challenge-page__link _button-yellow'
                                >
                                    Создать челлендж
                                </Link>
                            )}
                            <Tabs
                                labels={labelsTabChallenge}
                                onClick={setValueTab}
                                value={valueTab}
                                customClassParent={'scroll-tabs'}
                                customClassChildren={'scroll-tabs-labels'}
                            />
                            {/* <div className='challenge-page__platform'>
                                <Platform />
                            </div> */}
                            {
                                contentTabs.map((content, index) => (
                                    <TabContent index={index} value={valueTab} key={index}>
                                        <div className='challenge-page__title-block block-title'>Активные</div>
                                        <div className="challenge-page__active-wrapper">
                                            <div className='challenge-page__active'>
                                                {content.activeChallenges?.length ? (
                                                    content.activeChallenges?.map((item) => (
                                                        <CardChallenge key={item.id} challenge={item} percent={0} />
                                                    ))
                                                ) : (
                                                    <div className='challenge-page__active-plug'>
                                                        Нет активных челленджей
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='challenge-page__title-block block-title'>
                                            Новые челленджи
                                        </div>
                                        {content.newChallenges?.length ? (
                                            content.newChallenges.map((item, i) => (
                                                <div className={'challenge-page__new-challenges'} key={i}>
                                                    <NewChallengeCard
                                                        type={item.type}
                                                        id={item.id}
                                                        description={item.description}
                                                        image={item.image}
                                                        title={item.title}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className='challenge-page__active-plug'>
                                                Нет новых челленджей
                                            </div>
                                        )}
                                    </TabContent>
                                ))
                            }
                        </div>
                    </div>}
            <NavigationComponent />
        </div>
    )
}

export default ChallengePage
