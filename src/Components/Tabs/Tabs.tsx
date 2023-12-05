import React, { Dispatch, FC, SetStateAction } from 'react'
import './tabs.scss'

interface ITabContentProps {
  children: React.ReactNode | JSX.Element | JSX.Element[]
  index: number
  value: number,
  className?: string | undefined
}

interface ITabs {
  labels: Array<string>
  onClick: Dispatch<SetStateAction<number>>
  value: number
  customClassChildren?: string
  customClassParent?: string
}

export function TabContent(props: ITabContentProps) {
  const { children, value, index } = props

  return <div className={`tabs__content ${props.className}`}>{index === value && children}</div>
}

export const Tabs: FC<ITabs> = ({
  labels,
  onClick,
  value,
  customClassChildren = 'tabs__links',
  customClassParent = 'tabs'
}) => {
  const handler = (i: number) => onClick(i)

  return (
    <div className={customClassParent}>
      {labels.map((item, i) => (
        <div
          key={i}
          className={
            i === value ? customClassChildren + ' active' : customClassChildren
          }
          onClick={() => handler(i)}
        >
          <span className={'s'}>{item}</span>
        </div>
      ))}
    </div>
  )
}
