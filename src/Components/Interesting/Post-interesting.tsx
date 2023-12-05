import './interesting.scss'
import iconClock from '../../assets/image/Interesting/clock.svg'
import plug from '../../assets/image/plug.png'
import iconComments from '../../assets/image/icon-comments-fill.svg'
import { useParams } from 'react-router-dom'
import { IMAGE_URL } from '../../http'
import { useGetNewsByIdQuery, useLikeNewsMutation } from '../../services/news.api'
import { errorHandler } from "../../utils/errorsHandler";

export const PostInteresting = () => {
  const params = useParams()
  const { data: news } = useGetNewsByIdQuery(Number(params.id))

  const [putLike] = useLikeNewsMutation()

  const like = async () => await putLike(Number(params.id)).unwrap().catch((e) => errorHandler(e))

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {news && (
        <div className={'post-interesting'}>
          <div className='post-interesting__image'>
            {news.image && (
              <img
                src={IMAGE_URL + 'news/' + news.image}
                alt={'news/' + news.id}
              />
            )}
            {!news.image && <img src={plug} alt={'news/'} />}
          </div>
          <div className='post-interesting__body'>
            <div className='post-interesting__text'>
              <img src={iconClock} alt='' />
              <span>
                {new Date(news.created_at * 1000).toLocaleDateString()}
              </span>
              <span>{news.author}</span>
            </div>
            <div className='post-interesting__title block-title'>
              {news.title}
            </div>
            <div className='post-interesting__feed-back feed-back'>
              <div className='feed-back__favourite' onClick={like}>
                {news.likes}
                <span style={{ color: 'white', fontSize: 18 }}>❤</span>
              </div>
              <div className='feed-back__comments'>
                <img src={iconComments} alt='comments' />
                {news.comments}
              </div>
            </div>
            <div className='post-interesting__content' dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </div>
      )}
    </div>
  )
}
