import { ITracksSleepDaysWeek } from '../models/ITracker'

export const toolbarOptions = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean']
]

export const CATEGORY_NEWS = [
  {
    id: 0,
    title: 'Все'
  },
  {
    id: 4,
    title: 'Новость'
  },
  {
    id: 2,
    title: 'Инструкция'
  },
  {
    id: 3,
    title: 'Библиотека'
  },
  {
    id: 1,
    title: 'Сервисы'
  }
]

export const tracksSleepDaysWeek: ITracksSleepDaysWeek[] = [
  {
    day: 'пн',
    type: 1
  },
  {
    day: 'пн',
    type: 4
  },
  {
    day: 'вт',
    type: 1
  },
  {
    day: 'вт',
    type: 4
  },
  {
    day: 'ср',
    type: 1
  },
  {
    day: 'ср',
    type: 4
  },
  {
    day: 'чт',
    type: 1
  },
  {
    day: 'чт',
    type: 4
  },
  {
    day: 'пт',
    type: 1
  },
  {
    day: 'пт',
    type: 4
  },
  {
    day: 'сб',
    type: 1
  },
  {
    day: 'сб',
    type: 4
  },
  {
    day: 'вс',
    type: 1
  },
  {
    day: 'вс',
    type: 4
  }
]
export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

export const monthsABBR = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек'
]

export const WEB_CLIENT_ID =
  '892578456296-nmrjb7m8pn1f109psnaoff2q2es6s19f.apps.googleusercontent.com'
export const ANDROID_CLIENT_ID =
  '892578456296-f9gqaa4k7sror2c3iitvi511oh7el0kj.apps.googleusercontent.com'

export const VERSION_NAME:number = 1001004 //означает "1.1.4" - вторую и третью цифру дополняем нулями до трехзначного числа
