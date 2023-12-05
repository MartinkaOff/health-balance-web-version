import React, { FC } from "react"
import { IMAGE_URL } from '../../http'
import plug from '../../assets/image/plug.png'

interface IHeaderChallengeIcon {
    image: string
}

export const HeaderChallengeIcon: FC<IHeaderChallengeIcon> = ({ image }) => {
    return (
        <div className='card-active-challenge__icon'>
            {image && <img src={IMAGE_URL + 'challenges/' + image} alt='logo' />}
            {!image && <img src={plug} alt='logo' />}
        </div>
    )
}