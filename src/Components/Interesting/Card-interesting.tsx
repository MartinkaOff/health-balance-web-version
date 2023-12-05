import { FC } from 'react'
import { Link } from "react-router-dom"
import { INews } from "../../models/INews"
import { POST_INTERESTING_ROUTE } from "../../provider/constants-route"
import { rubricConversion } from "../../utils/common-functions"
import { IMAGE_URL } from "../../http"
import plug from '../../assets/image/plug.png'
import './interesting.scss'
import iconClock from '../../assets/image/Interesting/clock.svg'


interface ICardInteresting {
	dataNews: INews
 }
 
 export const CardInteresting: FC<ICardInteresting> = ({ dataNews }) => {
	return (
	  <Link
		 to={POST_INTERESTING_ROUTE + '/' + dataNews.id}
		 className='card-interesting'
	  >
		 <div className='card-interesting__container'>
			<div className='card-interesting__image'>
			  <div className={'card-interesting__hint _hint'}>
				 {rubricConversion(dataNews.category)}
			  </div>
			  {dataNews.image && <img
				 src={IMAGE_URL + 'news/' + dataNews.image}
				 alt='image-interesting'
			  />}
			  {!dataNews.image && <img
				 src={plug}
				 alt='image-interesting'
			  />}
			</div>
			<div className='card-interesting__title'>{dataNews.title}</div>
			<div className='card-interesting__text'>{dataNews.annotation}</div>
			<div className='card-interesting__info info-card'>
			  <div className='info-card__date'>
				 <img src={iconClock} alt='clock' />
				 {new Date(dataNews.created_at * 1000).toLocaleDateString()}
			  </div>
			  <div className='info-card__author'>
				 Автор: {dataNews.author}
			  </div>
			</div>
		 </div>
	  </Link>
	)
 }
 