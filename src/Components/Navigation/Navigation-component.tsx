import { FC } from 'react'
import '../../assets/style/icon-font.scss'
import './navigation.scss'
import { NavLink } from 'react-router-dom'
import {
  ACTIVITY_ROUTE,
  CHALLENGE_ROUTE,
  HEALTH_INDEX_ROUTE,
  INTERESTING_ROUTE,
  TRACKER_ROUTE,
  STATISTICS_TRACKER__ROUTE
} from '../../provider/constants-route'



export const NavigationComponent: FC = () => {
  return (
    <div className={'navigation'}>
      <div className='navigation__body'>
        <NavLink
          to={ACTIVITY_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation__link active icon-icon_fire_active'
              : 'navigation__link icon-icon_fire'
          }
        >
          Активность
        </NavLink>
        <NavLink
          to={STATISTICS_TRACKER__ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation__link active icon-icon_check-box'
              : 'navigation__link icon-icon_check-box'
          }
        >
          Трекер
        </NavLink>
        <NavLink
          to={HEALTH_INDEX_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation__link active icon-icon_cardioelectric'
              : 'navigation__link icon-icon_cardioelectric'
          }
        >
          Индексы
        </NavLink>
        <NavLink
          to={CHALLENGE_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation__link active icon-icon_energy-active'
              : 'navigation__link icon-icon-challenge'
          }
        >
          Челленджи
        </NavLink>
        <NavLink
          to={INTERESTING_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation__link active icon-icon_hb_news'
              : 'navigation__link icon-icon_hb_news'
          }
        >
          Интересное
        </NavLink>
      </div>
    </div>
  )
}
