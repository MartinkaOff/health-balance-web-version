import googleFit from '../../assets/image/icons-tracker-connection/icon-google-fit.png'
import appleHealth from '../../assets/image/icons-tracker-connection/icon-apple-health-appresult.png'
import samsungHealth from '../../assets/image/icons-tracker-connection/icon-samsung-health.png'
import huaweiHealth from '../../assets/image/icons-tracker-connection/icon-huawei-health.png'
import miFit from '../../assets/image/icons-tracker-connection/icon-mi-fit.png'
import './registration.scss'

export const TrackerConnection = () => {
  return (
    <div className={'tracker-connection'}>
      <div className='tracker-connection__row'>
        <div className='tracker-connection__column'>
          <div className='tracker-connection__icon'>
            <img src={googleFit} alt='googleFit' />
          </div>
          <div className='tracker-connection__text'>Google fit</div>
        </div>
        <div className='tracker-connection__column'>
          <div className={'tracker-connection__text text-blue'}>Отключить</div>
          <div className={'tracker-connection__text text-yellow'}>
            Подключить
          </div>
        </div>
      </div>
      <div className='tracker-connection__row'>
        <div className='tracker-connection__column'>
          <div className='tracker-connection__icon'>
            <img src={appleHealth} alt='appleHealth' />
          </div>
          <div className='tracker-connection__text'>Apple Health</div>
        </div>
        <div className='tracker-connection__column'>
          <div className={'tracker-connection__text text-blue'}>Отключить</div>
          <div className={'tracker-connection__text text-yellow'}>
            Подключить
          </div>
        </div>
      </div>
      <div className='tracker-connection__row'>
        <div className='tracker-connection__column'>
          <div className='tracker-connection__icon'>
            <img src={samsungHealth} alt='samsungHealth' />
          </div>
          <div className='tracker-connection__text'>Samsung Health</div>
        </div>
        <div className='tracker-connection__column'>
          <div className={'tracker-connection__text text-blue'}>Отключить</div>
          <div className={'tracker-connection__text text-yellow'}>
            Подключить
          </div>
        </div>
      </div>
      <div className='tracker-connection__row'>
        <div className='tracker-connection__column'>
          <div className='tracker-connection__icon'>
            <img src={huaweiHealth} alt='huaweiHealth' />
          </div>
          <div className='tracker-connection__text'>Huawei Health</div>
        </div>
        <div className='tracker-connection__column'>
          <div className={'tracker-connection__text text-blue'}>Отключить</div>
          <div className={'tracker-connection__text text-yellow'}>
            Подключить
          </div>
        </div>
      </div>
      <div className='tracker-connection__row'>
        <div className='tracker-connection__column'>
          <div className='tracker-connection__icon'>
            <img src={miFit} alt='miFit' />
          </div>
          <div className='tracker-connection__text'>Mi Fit</div>
        </div>
        <div className='tracker-connection__column'>
          <div className={'tracker-connection__text text-blue'}>Отключить</div>
          <div className={'tracker-connection__text text-yellow'}>
            Подключить
          </div>
        </div>
      </div>
    </div>
  )
}
