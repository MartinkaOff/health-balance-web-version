import { FC } from 'react'
import Picker from 'rmc-picker'
import './scroll-picker.scss'
import 'rmc-picker/assets/index.css'

interface IPicker {
  onChange: (value: string) => void
  onScrollChange?: (value: string) => void
  items: any
  value: any
  size?: number
  totalHeight?: number
  customClassname?: string
  fontSize?: number
}

export const ScrollPicker: FC<IPicker> = ({
  onChange,
  onScrollChange,
  items,
  value,
  size = 3,
  totalHeight = 47,
  customClassname,
  fontSize = 13
}) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={onChange}
      onScrollChange={onScrollChange}
      indicatorClassName={
        customClassname ? 'indicator ' + customClassname : 'indicator'
      }
      indicatorStyle={{ height: totalHeight }}
      style={{ height: totalHeight * size }}
      itemStyle={{ height: totalHeight, fontSize: fontSize }}
    >
      {items}
    </Picker>
  )
}
