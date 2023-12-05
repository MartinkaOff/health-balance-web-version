import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {CHALLENGE_ROUTE} from '../../provider/constants-route'
import './team-selection.scss'
import {TeamItem} from './Team-item'
import {useGetChallengesTeamQuery} from "../../services/ChallengeService";
import {Preloader} from "../Preloader/Preloader";

export const TeamSelection = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [existTeam, setExistTeam] = useState<boolean>(false)
    const {data: teams, isLoading} = useGetChallengesTeamQuery(Number(params.id))

    const redirectToChallenge = () => navigate(CHALLENGE_ROUTE)

    return (
        <div className={'team-selection'}>
            <>
                {isLoading ? (
                    <Preloader height={'auto'}/>
                ) : teams ? (
                    <>
                        {teams.map((item) => (
                            <TeamItem
                                key={item.id}
                                commandId={item.id}
                                title={item.title}
                                img={''}
                                challengeId={item.challenge_id}
                                existTeam={existTeam}
                                setExistTeam={setExistTeam}
                            />
                        ))}
                        {teams.length ? (
                            <button
                                onClick={redirectToChallenge}
                                className={
                                    existTeam
                                        ? 'team-selection-page__button _button-white'
                                        : 'team-selection-page__button _button-white disabled'
                                }
                                disabled={!existTeam}
                            >
                                Готово
                            </button>
                        ) : (
                            <h1>Команд нет!</h1>
                        )}
                    </>
                ) : (
                    <h1>Данных нет!</h1>
                )}
            </>
        </div>
    )
}

