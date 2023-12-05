import React, { FC } from 'react'

interface IVideo {
  url: string
}

export const Video: FC<IVideo> = ({ url }) => {

  return (
    <div className='lecture__video'>
      <iframe
        src={url}
        width="560"
        height="315"
        allowFullScreen
        frameBorder="0"
      //frameborder="0"
      ></iframe>
    </div>
  )
}
