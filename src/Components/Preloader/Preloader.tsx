import { FC } from 'react'
import './preloader.scss'

interface IPreloader {
  height?: string
}

export const Preloader:FC<IPreloader> = ({height}) => {
  return (
<div className="loader" style={{height: height ? height : `calc(100vh - 32px)`}}>
	<div className="loader__body"></div>
</div>
  )
}
