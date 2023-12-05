import {FC} from 'react'
import './interesting.scss'
import {CardInteresting} from './Card-interesting'
import {Preloader} from '../Preloader/Preloader'
import {useGetNewsByCategoryQuery} from '../../services/news.api'


interface ICardsInteresting {
    idCategory: number
}

export const CardsInteresting: FC<ICardsInteresting> = ({idCategory}) => {

    const {data: news, isLoading, error, isError} = useGetNewsByCategoryQuery(idCategory)

    return (
        <>
          {isError ? (
              <>{'data' in error && error.data}</>
          ) : isLoading ? (
              <Preloader height='auto'/>
          ) : news?.length ? (
              <>
                {news?.map((item) => <CardInteresting dataNews={item} key={item.id}/>)}
              </>
          ) : (
              <div className='active-plug'>Новостей нет</div>
          )}
        </>
    )
}

