import {IComment} from "../../models/INews";
import {Dispatch, FC} from "react";
import {IMAGE_URL} from "../../http";
import avatar from "../../assets/image/avatar.jpeg";


interface ICommentItem {
    comment: IComment
    setShowForm: Dispatch<boolean>
    setParentId: Dispatch<number>
    setAuthor: Dispatch<string | null>,
    replyAuthor?: string
}

export const ItemComment: FC<ICommentItem> = ({
                                                  comment,
                                                  setShowForm,
                                                  setParentId,
                                                  setAuthor,
                                                  replyAuthor
                                              }) => {
    const idProfile = Number(localStorage.getItem('id'))

    const openForm = (id: number, name: string) => {
        setShowForm(true)
        setParentId(id)
        setAuthor(name)
    }

    const formatDate = (date: number) => {
        return (
            new Date(date * 1000).toLocaleDateString() +
            ' в ' +
            (new Date(date * 1000).getHours()).toString().padStart(2, '0') +
            ':' +
            (new Date(date * 1000).getMinutes()).toString().padStart(2, '0')
        )
    }

    return (
        <div className={replyAuthor ? 'item-comment item-comment_reply' : 'item-comment'}>
            <div className='item-comment__body'>
                <div
                    className={replyAuthor ? 'item-comment__avatar item-comment__avatar_reply' : 'item-comment__avatar'}>
                    <img
                        src={
                            comment.customer_avatar
                                ? IMAGE_URL + 'avatars/' + comment.customer_avatar
                                : avatar
                        }
                        alt='avatar'
                    />
                </div>
                <div className='item-comment__info'>
                    <div className='item-comment__author author-text'>
                        {comment.customer_name}
                        {replyAuthor && <span className={'small-text-comment'}>
                          Ответ пользователю {replyAuthor}
                        </span>}
                    </div>
                    <div className='item-comment__message message-text'>
                        {comment.comment}
                    </div>
                    <div className='item-comment__data small-text-comment'>
                        {formatDate(comment.created_at) || '12.12.21 в 12:32'}
                        {comment.customer_id !== idProfile && (
                            <span onClick={() => {
                                openForm(comment.id, comment.customer_name)
                                setTimeout(() => {
                                    let commentFormRef = document.querySelectorAll('.comment-form')[1]
                                    commentFormRef?.scrollIntoView({block: 'end', behavior: 'smooth'})
                                }, 0)
                            }}>
                            Ответить</span>
                        )}
                    </div>
                </div>
            </div>
            {comment.childrens.length !== 0 && <div className='item-comment__answer'>
                {comment.childrens.map((item) => (
                    <div className={'item-comment-reply'} key={item.id}>
                        <ItemComment
                            setParentId={setParentId}
                            setShowForm={setShowForm}
                            comment={item}
                            setAuthor={setAuthor}
                            replyAuthor={comment.customer_name}
                        />
                    </div>

                ))}
            </div>}
        </div>
    )
}


