import { FC } from 'react'
import './target.scss'
import icon_status_full from '../../assets/image/icon_purpose__status_full.svg'
import { IStepsPerDay } from '../../models/IApp'


interface IDays {
	percent: number,
	item: IStepsPerDay
 }
 
 export const CircleDays: FC<IDays> = ({ percent, item }) => {
 
	const circleOutlineLength: number = 295
 
	return (
	  <div className='target__days days'>
		 {item.finished ? (
			<img src={icon_status_full} alt='' className='days__circle' />
		 ) : (
			<svg className='days__circle' viewBox='0 0 100 100'>
			  <path
				 d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
				 fill={'#191919'}
				 stroke={'#999999'}
				 strokeWidth={3}
				 id={'dfg'}
			  ></path>
			  <path
				 d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
				 stroke={'#56CCF2'}
				 strokeWidth={3}
				 fillOpacity={0}
				 style={{
					strokeDasharray: '295.416, 295.416',
					strokeDashoffset:
					  circleOutlineLength - (circleOutlineLength * percent) / 100
				 }}
			  ></path>
			</svg>
		 )}
		 <div className='days__text'>{item.day}</div>
	  </div>
	)
 }