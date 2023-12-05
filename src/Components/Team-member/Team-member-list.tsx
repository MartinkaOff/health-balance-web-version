import {Link, useParams} from 'react-router-dom'
import {CHAT__ROUTE, PROFILE_MEMBER_ROUTE} from '../../provider/constants-route'
import icon_chat from '../../assets/image/icon_chat.svg'
import './team-member-list.scss'
import React from 'react'
import {IMAGE_URL} from '../../http'
import avatar from '../../assets/image/avatar.jpeg'
import {Preloader} from '../Preloader/Preloader'
import {useGetCustomersTeamQuery} from "../../services/ChallengeService";

export const TeamMemberList = () => {
    const params = useParams()

    const {data: members, isLoading} = useGetCustomersTeamQuery(Number(params.id))

    return (
        <div className={'team-member-list'}>

            {isLoading ? (
                <Preloader height='auto'/>
            ) : members ? (
                <>
                    {members.customers.length ?
                        members.customers.map((item) => (
                            <div className='team-member-list__row' key={item.id}>
                                <Link
                                    to={PROFILE_MEMBER_ROUTE + '/' + item.id}
                                    className='team-member-list__column'
                                >
                                    <div className='team-member-list__avatar'>
                                        <img
                                            src={
                                                item.avatar ? IMAGE_URL + 'avatars/' + item.avatar : avatar
                                            }
                                            alt='avatar'
                                        />
                                    </div>
                                    <div className='team-member-list__user-name'>{item.name}</div>
                                </Link>
                                <div className='team-member-list__column'>
                                    <Link to={CHAT__ROUTE}>
                                        <img src={icon_chat} alt='chat'/>
                                    </Link>
                                </div>
                            </div>
                        )) : <h1>Участников нет!</h1>}
                </>
            ) : (
                <h1>Данных нет</h1>
            )}
        </div>
    )
}
