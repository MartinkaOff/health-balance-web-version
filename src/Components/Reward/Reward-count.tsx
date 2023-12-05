import { FC } from 'react'
import icon from '../../assets/image/icon_reward.svg'
import './reward.scss'

interface IReward {
  count: number
  fontSize?: number
  sizeIcon?: number
}

export const RewardCount: FC<IReward> = ({
  count,
  fontSize,
  sizeIcon = 17
}) => {
  return (
    <div className={'reward-count'}>
      <img
        className='reward-count__icon'
        style={{ flex: `0 0 ${sizeIcon}`, height: sizeIcon }}
        src={icon}
        alt='icon'
      />
      <span className='reward-count__value' style={{ fontSize: fontSize }}>
        {count}
      </span>
    </div>
  )
}
