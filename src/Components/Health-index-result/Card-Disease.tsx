import warning from '../../assets/image/icon-warning.svg'
import danger from '../../assets/image/icon-danger.svg'
import success from '../../assets/image/purpose__status_full_green.svg'
import { FC } from 'react'

interface ICardDisease {
  title: string,
  risk: number,
  tag?: string
}

interface IRisk {
  title: string,
  color: string
}

export const CardDisease: FC<ICardDisease> = ({ risk, title, tag }) => {

  const calculateCardioRisk = (value: number):IRisk  => {
    if (value <= 5) {
      return {
        title: 'Низкий',
        color: '#00A62E'
      }
    }
    if (value > 5 && value <= 15) {
      return {
        title: 'Средний',
        color: '#F4C119'
      }
    }
     return {
      title: 'Высокий',
      color: '#F24A4A'
    }
  }

  const definitionRisk = (value: number):IRisk => {
    if (tag === 'cardio_risk') {
      return {
        title: calculateCardioRisk(value).title,
        color: calculateCardioRisk(value).color
      }
    }
    switch (value) {
      case 1:
        return {
          title: 'Низкий',
          color: '#00A62E'
        }
      case 2:
        return {
          title: 'Средний',
          color: '#F4C119'
        }
      case 3:
        return {
          title: 'Высокий',
          color: '#F24A4A'
        }
      default:
        return {
          title: 'Не определен',
          color: 'gray'
        }
    }
  }


  return (
    <div className={'card-disease'}>
      <div className='card-disease__title'>{title}</div>
      <div className='card-disease__mark' style={{ color: definitionRisk(risk).color }}>
        {definitionRisk(risk).title === 'Низкий' && <img src={success} alt='success' />}
        {definitionRisk(risk).title === 'Средний' && <img src={warning} alt='warning' />}
        {definitionRisk(risk).title === 'Высокий' && <img src={danger} alt='danger' />}
        {definitionRisk(risk).title}
      </div>
    </div>
  )
}
