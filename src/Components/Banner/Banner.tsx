import {FC, useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import icon_banner from '../../assets/image/banner/icon-banner.svg'
import {
    CHALLENGE_ROUTE,
    INTERESTING_ROUTE,
    INTERVIEW_PAGE,
    LECTURE_ROUTE,
    NEW_CHALLENGE_INFO_ROUTE
} from '../../provider/constants-route'
import './banner.scss'
import {useGetBannerQuery} from "../../services/api";
import {IMAGE_URL} from "../../http";
import plug from "../../assets/image/plug.png";
import {IBanner} from '../../models/IApp'


export const Banner = () => {
    const {data: banners} = useGetBannerQuery(null, {
        refetchOnMountOrArgChange: false
    })
    const banner: IBanner = banners?.length ? banners[0] : {} as IBanner
    if (!banner.active) return null

    const path = [
        {
            path: NEW_CHALLENGE_INFO_ROUTE,
            tag: 'challenges'
        },
        {
            path: LECTURE_ROUTE,
            tag: 'lessons'
        },
        {
            path: INTERESTING_ROUTE,
            tag: 'news'
        }]

    const bannerImage = banner.image?.split(".")
    const pathImage = `${IMAGE_URL}banners/${bannerImage[0]}_120.${bannerImage[1]}`

    return (
        <Link to={`${path.find(item=>item.tag === banner.type.tag)?.path}/${banner.type.id}`} className={'banner'}>
            <div className='banner__img'>
                <img
                    src={banner?.image ? pathImage : icon_banner}
                    alt={'icon-banner'}
                />
            </div>
            <div className='banner__info'>
                <div className='banner__title'>{banner.title}</div>
                <div className='banner__text'>{banner.annotation}</div>
            </div>
        </Link>
    )
}
