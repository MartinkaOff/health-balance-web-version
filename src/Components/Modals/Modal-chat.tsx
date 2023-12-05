import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'
import avatarPlug from '../../assets/image/avatar.jpeg'
import { IAllChannels } from '../../models/IChat'
import ChatService from '../../services/ChatService'
import { showToast } from '../../utils/common-functions'
import './modals.scss'

interface IModalChat {
  active: boolean
  setActive: Dispatch<boolean>
  idUser: number
}

export const ModalChat: FC<IModalChat> = ({ active, setActive, idUser }) => {
  const [channels, setChannels] = useState<IAllChannels[]>([])
  const [titleChannel, setTitleChannel] = useState<string>('')

  const changeCannel = async (
    channel_id: number,
    title: string,
    customers_id: number[]
  ) => {
    customers_id.push(idUser)
    try {
      const response = await ChatService.changeChannel(
        channel_id,
        title,
        customers_id
      )
      if (Array.isArray(response.data.data)) {
        setActive(false)
        await showToast('Пользователь добавлен в чат!')
      } else {
        await showToast('Произошла ошибка!')
      }
    } catch (error) {
      await showToast('Произошла ошибка!')
    }
  }

  const newChannel = async () => {
    try {
      const response = await ChatService.newChannel(titleChannel, [idUser])
      if (Array.isArray(response.data.data)) {
        setActive(false)
        await showToast('Пользователь добавлен в чат!')
      } else {
        await showToast('Произошла ошибка!')
      }
    } catch (error) {
      await showToast('Произошла ошибка!')
    }
  }

  useEffect(() => {
    (async () => {
      const response = await ChatService.getChannels()
      setChannels(response.data.data)
    })()
  }, [])

  return (
    <div
      className={active ? 'modal-chat active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={
          active ? 'modal-chat__content active' : 'modal-chat__content'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-chat__row'>
          <div className='modal-chat__list-channels channels-list'>
            <div className='channels-list__title'>Выберите канал:</div>
            {channels.map((item) => (
              <div
                className='channels-list__item'
                key={item.id}
                onClick={() =>
                  changeCannel(
                    item.id,
                    item.title,
                    item.members.map((member) => member.id)
                  )
                }
              >
                <div className='channels-list__img'>
                  <img src={avatarPlug} alt='' />
                </div>
                <div className='channels-list__title'>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          <input
            type='text'
            className='_field'
            placeholder='Название канала'
            style={{ marginBottom: 20 }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitleChannel(e.target.value)
            }
          />
          <button
            className='modal-chat__button _button-white'
            onClick={newChannel}
          >
            Создать новый
          </button>
        </div>
      </div>
    </div>
  )
}
