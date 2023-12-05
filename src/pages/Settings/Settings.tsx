import './settings.scss'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { SYNCING_ROUTE } from '../../provider/constants-route'
import { DOC_URL } from '../../http'
import { Capacitor } from '@capacitor/core'

export const Settings = () => {

  return (
    <div className={'settings'}>
      <Header title={'Настройки'} />
      <div className='settings__container'>
        {Capacitor.getPlatform() === 'android' && (
          <div className='settings__block'>
            <div className='settings__title'>Синхронизация</div>
            <div className='settings__row'>
              <div className='settings__notification-title'>Приложения</div>
              <Link
                to={SYNCING_ROUTE}
                className='settings__notification-title settings__notification-title_blue'
              >
                Настроить
              </Link>
            </div>
          </div>
        )}
        <div className='settings__block'>
          <div className='settings__block-links'>
            <a
              href={`${DOC_URL}terms.pdf`}
              className='settings__notification-title settings__notification-title_blue'
              target='_blank'
              rel='noreferrer'
            >
              Условия использования
            </a>
            <a
              href={`${DOC_URL}privacy.pdf`}
              className='settings__notification-title settings__notification-title_blue'
              target='_blank'
              rel='noreferrer'
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
