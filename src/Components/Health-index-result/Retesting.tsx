import './health-index-result.scss'
import { QUESTIONNAIRE_ROUTE } from '../../provider/constants-route'
import { Link } from 'react-router-dom'

export const Retesting = () => {
  return (
    <div className={'retesting'}>
      <div className='retesting__text'>
        Индексы устарели
        <span>Пройдите тестирование</span>
      </div>
      <Link to={QUESTIONNAIRE_ROUTE} className='retesting__link'>
        Тестирование
      </Link>
    </div>
  )
}
