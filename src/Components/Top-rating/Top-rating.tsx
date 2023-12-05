import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../http'
import { PROFILE_MEMBER_ROUTE } from '../../provider/constants-route'

import { useAppSelector } from '../../hooks/redux-hooks'
import './top-rating.scss'
import avatar from '../../assets/image/avatar.jpeg'
import { sklonenie } from '../../utils/common-functions'
import { currentStepsCountSelector } from '../../Redux/slice/appSlice'
import { useLeaderboardQuery } from '../../services/leaderboard.api'
import { Preloader } from "../Preloader/Preloader";

export const TopRating = () => {

    let leaderDisplayOrder = 2
    const currentStepsCount = useAppSelector(currentStepsCountSelector)

    const { data: leaderBoard, isLoading, isError, error, refetch } = useLeaderboardQuery(null)

    useEffect(() => {
        refetch()
    }, [currentStepsCount])

    return (
        <div className={'top-rating top-rating__wrapper'}>
            {
                <>
                    {isError ? (
                        <>{'data' in error && error.data}</>
                    ) : isLoading ? (
                        <Preloader height={'auto'} />
                    ) : leaderBoard && (
                        <>
                            <div className='top-rating__header-top'>
                                {leaderBoard.today.length ? (
                                    leaderBoard.today.length >= 3 ? (
                                        leaderBoard.today.map((item, i, topToday) => {
                                            if (leaderDisplayOrder === 0) {
                                                leaderDisplayOrder = 3
                                            }
                                            leaderDisplayOrder--

                                            if (i <= 2) {
                                                return (
                                                    <Link
                                                        key={i}
                                                        to={
                                                            PROFILE_MEMBER_ROUTE +
                                                            '/' +
                                                            topToday[leaderDisplayOrder].id
                                                        }
                                                        className='top-rating__personal personal'
                                                    >
                                                        <div
                                                            className={
                                                                'personal__avatar ' +
                                                                (leaderDisplayOrder === 0 && 'leader')
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    'personal__place personal__place' +
                                                                    (leaderDisplayOrder + 1 !== 1 &&
                                                                        '_' + (leaderDisplayOrder + 1))
                                                                }
                                                            >
                                                                {leaderDisplayOrder + 1}
                                                            </span>
                                                            <img
                                                                src={
                                                                    topToday[leaderDisplayOrder].avatar
                                                                        ? IMAGE_URL +
                                                                        'avatars/' +
                                                                        topToday[leaderDisplayOrder].avatar
                                                                        : avatar
                                                                }
                                                                alt='avatar'
                                                            />
                                                        </div>
                                                        <div className='personal__name'>
                                                            {topToday[leaderDisplayOrder].name} <br />{' '}
                                                            {topToday[leaderDisplayOrder].surname}
                                                        </div>
                                                        <div className='personal__count-steps'>
                                                            {topToday[leaderDisplayOrder].total_quantity}{' '}
                                                            {sklonenie(topToday[leaderDisplayOrder].total_quantity, [
                                                                'шаг',
                                                                'шага',
                                                                'шагов'
                                                            ])}
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        })
                                    ) : (
                                        leaderBoard.today.map((item, i) => (
                                            <Link
                                                key={i}
                                                to={PROFILE_MEMBER_ROUTE + '/' + item.id}
                                                className='top-rating__personal personal'
                                            >
                                                <div className={'personal__avatar ' + (i === 0 && 'leader')}>
                                                    <span
                                                        className={'personal__place personal__place_' + (i + 1)}
                                                    >
                                                        {i + 1}
                                                    </span>
                                                    <img
                                                        src={
                                                            item.avatar
                                                                ? IMAGE_URL + 'avatars/' + item.avatar
                                                                : avatar
                                                        }
                                                        alt='avatar'
                                                    />
                                                </div>
                                                <div className='personal__name'>
                                                    {item.name} <br /> {item.surname}
                                                </div>
                                                <div className='personal__count-steps'>
                                                    {item.total_quantity}{' '}
                                                    {sklonenie(item.total_quantity, ['шаг', 'шага', 'шагов'])}
                                                </div>
                                            </Link>
                                        ))
                                    )
                                ) : (
                                    <h1 style={{ marginLeft: 10 }}>Данных за сегодня нет</h1>
                                )}
                            </div>
                            <div className='top-rating__list list-participant'>
                                {leaderBoard.today.map(
                                    (item, i) =>
                                        i > 2 && (
                                            <Link
                                                to={PROFILE_MEMBER_ROUTE + '/' + item.id}
                                                className='list-participant__item'
                                                key={i}
                                            >
                                                <div className='list-participant__column'>
                                                    <div className='list-participant__number'>{i + 1}</div>
                                                    <div className='list-participant__avatar'>
                                                        <img
                                                            src={
                                                                item.avatar
                                                                    ? IMAGE_URL + 'avatars/' + item.avatar
                                                                    : avatar
                                                            }
                                                            alt='avatar'
                                                        />
                                                    </div>
                                                    <div className='list-participant__name'>{item.name}</div>
                                                </div>
                                                <div className='list-participant__column'>
                                                    <div className='list-participant__count-steps'>
                                                        {item.total_quantity}{' '}
                                                        {sklonenie(item.total_quantity, ['шаг', 'шага', 'шагов'])}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                )}
                            </div>
                        </>
                    )}
                </>

            }

        </div>
    )
}
