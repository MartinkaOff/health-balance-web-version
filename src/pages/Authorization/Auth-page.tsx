import { Capacitor } from '@capacitor/core'
import { FC } from 'react'
import { Auth } from '../../Components/Authorization/Auth'
import './auth-page.scss'

export const AuthPage: FC = () => {

  return (
    <div className={'auth-page'} style={{
      margin: Capacitor.getPlatform() === 'ios' ? 0 : '-16px',
      position: Capacitor.getPlatform() === 'ios' ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      width: Capacitor.getPlatform() === 'ios' ? '100%' : 'auto',
    }}>
      <Auth />
    </div>
  )
}
