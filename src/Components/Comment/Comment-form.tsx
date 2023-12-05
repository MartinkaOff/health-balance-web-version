import React, {ChangeEvent, FC, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useAddCommentsNewsMutation} from '../../services/news.api'
import './comment.scss'
import {ICreatingComment} from '../../models/INews'
import {errorHandler} from '../../utils/errorsHandler'

interface ICommentForm {
    parentId: number
    author?: string | null
    setShowForm?: any
}

export const CommentForm: FC<ICommentForm> = ({
                                                  parentId,
                                                  author,
                                                  setShowForm
                                              }) => {
    const params = useParams()
    const idNews = Number(params.id)
    const [message, setMessage] = useState<string>('')
    const [openTextarea, setOpenTextArea] = useState(false)
    const [addComment, {isLoading}] = useAddCommentsNewsMutation()

    const handlerFocus = () => setOpenTextArea(true)

    const handlerMessage = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setMessage(e.target.value)

    const submit = async () => {
        if(!message.trim()) return
        const data: ICreatingComment = {
            comment: message,
            news_id: idNews,
            parent_id: parentId
        }
        await addComment(data)
            .unwrap()
            .then((response) => {
                setShowForm && setShowForm(false)
                setMessage('')
                setOpenTextArea(false)
            })
            .catch((e) => {
                errorHandler(e)
            })
    }

    return (
        <div className={'comment-form'}>
            {author && (
                <div className='comment-form__answer-author'>
                    Вы отвечаете <span>{author}</span>
                </div>
            )}
            <div className='comment-form__body'>
            <textarea
                className='comment-form__textarea'
                value={message}
                onChange={handlerMessage}
                onFocus={handlerFocus}
                placeholder={!openTextarea ? 'Написать комментарий' : ''}
                style={{height: openTextarea ? 124 : 44}}
            />
                {openTextarea && (
                    <button className={'comment-form__button-submit'} onClick={submit} disabled={isLoading}>
                        Отправить
                    </button>
                )}
            </div>
        </div>
    )
}
