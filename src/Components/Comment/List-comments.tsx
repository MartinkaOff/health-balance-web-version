import { useState } from 'react'
import { CommentForm } from './Comment-form'
import { useParams } from 'react-router-dom'
import { sklonenie } from '../../utils/common-functions'
import {
  useGetListCommentsQuery,
  useGetNewsByIdQuery
} from '../../services/news.api'
import { ItemComment } from './ItemComment'

import './comment.scss'

export const ListComments = () => {
  const params = useParams()

  const { data: newsById } = useGetNewsByIdQuery(Number(params.id))
  const { data: comments } = useGetListCommentsQuery(Number(params.id))

  const [parentId, setParentId] = useState<number>(0)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [author, setAuthor] = useState<string | null>(null)

  return (
    <div className={'list-comments'}>
      <div className='list-comments__count'>
        {newsById?.comments}{' '}
        {sklonenie(newsById?.comments || 0, [
          'комментарий',
          'комментария',
          'комментариев'
        ])}
      </div>
      <div className='list-comments__items'>
        {comments?.map((comment) => (
          <ItemComment
            comment={comment}
            key={comment.id}
            setAuthor={setAuthor}
            setShowForm={setShowForm}
            setParentId={setParentId}
          />
        ))}
      </div>
      <div className='list-comments' style={{ padding: 0 }}>
        {showForm && (
          <CommentForm
            parentId={parentId}
            author={author}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  )
}
