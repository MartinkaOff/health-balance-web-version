import React from 'react'
import icon_platform from '../../assets/image/plug.png'
import './Platform.scss'
import { useGetCurrentPlatformQuery } from '../../services/platform.api'
import { Preloader } from '../Preloader/Preloader'
import { IMAGE_URL } from '../../http'

export const Platform = () => {
  const { data: platform, isError, isLoading } = useGetCurrentPlatformQuery()

  if (isLoading) return <Preloader height='auto' />

  if (isError)
    return (
      <div style={{ padding: 20 }}>
        <h1>Произошла непредвиденная ошибка</h1>
      </div>
    )

  return (
    <div className='platform'>
      <div className='platform__container'>
        <div className='platform__row'>
          <div className='platform__body'>
            <div className='platform__sub-text text-yellow'>Ваша платформа</div>
            <div className='platform__name-platform'>
              {platform?.data.title}
            </div>
          </div>
        </div>
        <div className='platform__img'>
          <img
            src={
              platform?.data.image
                ? IMAGE_URL + 'platforms/' + platform?.data.image
                : icon_platform
            }
            alt='image-platform'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = icon_platform
            }}
          />
        </div>
      </div>
    </div>
  )
}
