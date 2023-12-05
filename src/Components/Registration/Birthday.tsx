import { FC, useState } from 'react'
import {
  getItemsDays,
  getItemsMonth,
  getItemsYear,
  timeConverterUnix
} from '../../utils/common-functions'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import MultiPicker from 'rmc-picker/lib/MultiPicker'
import Picker from 'rmc-picker/lib/Picker'
import {
  birthdaySelector,
  setBirthday,
  setStage
} from '../../Redux/slice/authSlice'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { stageRegistration } from '../../utils/enums'

interface IBirthday {
  googleAuth?: boolean
}

export const Birthday: FC<IBirthday> = ({ googleAuth = false }) => {
  const itemDays = getItemsDays()
  const itemMonths = getItemsMonth()
  const itemYears = getItemsYear(
    new Date().getFullYear() - 80,
    new Date().getFullYear() - 18
  )
  const dispatch = useAppDispatch()
  const birthday = useAppSelector(birthdaySelector)

  const [value, setValue] = useState(
    new Date(birthday * 1000).toLocaleDateString().split('.')
  )

  const onChange = (value: any) => {
    setValue(value)
    dispatch(
      setBirthday(timeConverterUnix(value[0] + '.' + value[1] + '.' + value[2]))
    )
  }

  return (
    <>
      <div className={'registration__picker'}>
        <MultiPicker selectedValue={value} onValueChange={onChange}>
          <Picker
            indicatorClassName='my-picker-indicator'
            className={'registration__picker-item'}
          >
            {itemDays.map((item) => (
              <Picker.Item
                className='my-picker-view-item'
                value={item}
                key={+item}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker>
          <Picker
            indicatorClassName='my-picker-indicator'
            className={'registration__picker-item'}
          >
            {itemMonths.map((item, i) => (
              <Picker.Item
                className='my-picker-view-item'
                value={i + 1 >= 10 ? (i + 1).toString() : '0' + (i + 1)}
                key={i}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker>
          <Picker
            indicatorClassName='my-picker-indicator'
            className={'registration__picker-item'}
          >
            {itemYears.map((item) => (
              <Picker.Item
                className='my-picker-view-item'
                value={item}
                key={+item}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker>
        </MultiPicker>
      </div>
      {!googleAuth && (
        <Button
          customClass='registration__button'
          view={typesButton.white}
          onClick={() => dispatch(setStage(stageRegistration.gender))}
        >
          Далее
        </Button>
      )}
    </>
  )
}
