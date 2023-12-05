import { FC } from 'react'
import './list-leaders-challenge.scss'
import { Preloader } from '../Preloader/Preloader'
import { LeaderboardItem } from './Leaderboard-item'
import {
  useLeaderboardChallengeQuery,
  useLeaderboardTeamsQuery
} from '../../services/leaderboard.api'

interface IListLeadersChallenge {
  type: number
  idChallenge: number
}

export const ListLeadersChallenge: FC<IListLeadersChallenge> = ({
  type,
  idChallenge
}) => {
  const { data: leaderboardChallenge, isLoading: isLoadingChallenge } =
    useLeaderboardChallengeQuery(idChallenge, {
      skip: type === 2
    })
  const { data: leaderboardTeamsChallenge, isLoading: isLoadingTeams } =
    useLeaderboardTeamsQuery(idChallenge, {
      skip: type !== 2
    })

  if (isLoadingChallenge || isLoadingTeams) {
    return <Preloader />
  }

  return (
    <div className={'leader-challenge'}>
      <div className='leader-challenge__header'>
        <div className='leader-challenge__title'>
          {type === 1 || type === 3 ? 'Участники' : 'Команды'}
        </div>
        <div className='leader-challenge__title'>Прогресс</div>
      </div>
      <div className='leader-challenge__items'>
        {(type === 1 || type === 3) &&
          leaderboardChallenge?.map((item, i) => (
            <LeaderboardItem
              item={item}
              place={i + 1}
              typeChallenge={type}
              key={item.id}
            />
          ))}
        {type === 2 &&
          leaderboardTeamsChallenge?.map((item, i) => (
            <LeaderboardItem
              item={item}
              place={i + 1}
              typeChallenge={type}
              key={item.id}
            />
          ))}
      </div>
    </div>
  )
}
