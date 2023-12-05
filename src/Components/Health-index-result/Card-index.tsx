import { FC } from 'react'

interface ICardIndex {
  value: number
  title: string,
  tag: string
}

export const CardIndex: FC<ICardIndex> = ({ title, value, tag }) => {

  const calculateBodyMassIndex = (value: number): string[] => {
    if (value > 30) {
      return [value.toString(), 'Критично']
    }
    if (value > 25 && value <= 30) {
      return [value.toString(), 'Есть рсики']
    }
    if (value > 18.5 && value <= 25) {
      return [value.toString(), 'Рисков нет']
    }
    if (value > 16 && value <= 18.5) {
      return [value.toString(), 'Есть рсики']
    }
    return [value.toString(), 'Критично']
  }

  const calculatePhysicalActivity = (value: number): string[] => {
    if (value === 1) {
      return ['Опасное для здоровья', 'Критично']
    }
    if (value === 2) {
      return ['Средний показатель', 'Есть рсики']
    }
    if (value === 3) {
      return ['Все в порядке', 'Рисков нет']
    }
    return ['Не посчитано', 'Не посчитано']
  }


  const definitionRisk = (value: number) => {
    if (tag === 'body_mass_index') {
      return calculateBodyMassIndex(value)[0]
    }
    if (tag === 'physical_activity') {
      return calculatePhysicalActivity(value)[0]
    }
    switch (value) {
      case 0:
        return 'Не посчитано'
      case 1:
        return 'Все в порядке'
      case 2:
        return 'Средний показатель'
      case 3:
        return 'Опасное для здоровья'
      default:
        return value
    }
  }

  const hintRisk = (value: number) => {
    if (tag === 'body_mass_index') {
      return calculateBodyMassIndex(value)[1]
    }
    if (tag === 'physical_activity') {
      return calculatePhysicalActivity(value)[1]
    }
    switch (value) {
      case 0:
        return 'Не посчитано'
      case 1:
        return 'Рисков нет'
      case 2:
        return 'Есть рсики'
      case 3:
        return 'Критично!'
    }
  }

  const prefixBackgroundClassName = () => {
    if (tag === 'physical_activity') {
      switch (calculatePhysicalActivity(value)[1]) {
        case 'Рисков нет':
          return 1
        case 'Есть рсики':
          return 2
        case 'Критично':
          return 3
      }
    }
    if (calculateBodyMassIndex(value)[1] === 'Рисков нет' || value === 1) {
      return 1
    }
    if (calculateBodyMassIndex(value)[1] === 'Есть рсики' || value === 2) {
      return 2
    }
    if (calculateBodyMassIndex(value)[1] === 'Критично' || value === 3) {
      return 3
    }
  }

  return (
    <div
      className={
        'card-index ' +
        'card-index_' +
        prefixBackgroundClassName()
      }
    >
      <div className='card-index__head'>
        <div className='card-index__title'>{title}</div>
        <div className={'card-index__hint'}>{hintRisk(value)}</div>
      </div>
      <div
        className={
          'card-index__value_' +
          prefixBackgroundClassName()
        }
      >
        {definitionRisk(value)}
      </div>
    </div>
  )
}
