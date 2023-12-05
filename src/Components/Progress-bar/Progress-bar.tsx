import { FC } from 'react'
import { definitionColor } from '../../utils/common-functions'
import './progress-bar.scss'

interface IProgress {
  percent: number
  type: number
}

export const ProgressBar: FC<IProgress> = ({ percent, type }) => {
  return (
    <div className='progress-bar'>
      <div className='progress-bar__body'>
        <div className='progress-bar__strip'>
          <div
            style={{ width: percent + '%' }}
            className={definitionColor(type, 'progress-bar__fill')}
          />
        </div>
      </div>
    </div>
  )
}
