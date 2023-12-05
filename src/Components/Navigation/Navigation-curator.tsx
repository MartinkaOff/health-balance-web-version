import './navigation.scss'
import { NavLink } from 'react-router-dom'
import {
  ACTIVITY_ROUTE,
  CHALLENGE_ROUTE,
  HEALTH_INDEX_ROUTE,
  INTERESTING_ROUTE
} from '../../provider/constants-route'

export const NavigationCurator = () => {
  return (
    <div className={'NavigationComponentnavigation-curator'}>
      <div className='navigation__body'>
        <NavLink
          to={ACTIVITY_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation-curator__link active icon-icon_fire_active'
              : 'navigation-curator__link icon-icon_fire'
          }
        >
          Активность
        </NavLink>
        <NavLink
          to={HEALTH_INDEX_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation-curator__link active icon-icon_cardioelectric'
              : 'navigation-curator__link icon-icon_cardioelectric'
          }
        >
          Индексы
        </NavLink>
        <NavLink
          to={CHALLENGE_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation-curator__link active icon-icon_energy-active'
              : 'navigation-curator__link icon-icon-challenge'
          }
        >
          Челленджи
        </NavLink>
        <NavLink
          to={INTERESTING_ROUTE}
          className={({ isActive }) =>
            isActive
              ? 'navigation-curator__link active icon-icon_hb_news'
              : 'navigation-curator__link icon-icon_hb_news'
          }
        >
          Интересное
        </NavLink>
      </div>
    </div>
  )
}
