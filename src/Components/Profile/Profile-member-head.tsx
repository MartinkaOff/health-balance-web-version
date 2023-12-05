import './profile.scss'
import {useNavigate} from 'react-router-dom'
import {DIALOG__ROUTE} from '../../provider/constants-route'
import avatar from '../../assets/image/avatar.jpeg'
import icon_chat from '../../assets/image/icon_chat.svg'
import {IMAGE_URL} from '../../http'
import ChatService from '../../services/ChatService'
import {FC, useState} from 'react'
import {ModalChat} from '../Modals/Modal-chat'
import {IUser} from '../../models/IUsers'
import {dataUserSelector} from '../../Redux/slice/profileSlice'
import {useAppSelector} from '../../hooks/redux-hooks'


interface IProfileMemberHead {
    profileMember: IUser
}

export const ProfileMemberHead: FC<IProfileMemberHead> = ({profileMember}) => {

    const profile = useAppSelector(dataUserSelector)
    const [modalChat, setModalChat] = useState<boolean>(false)
    const navigate = useNavigate()

    const goChat = async () => {
        const response = await ChatService.newChannel(
            profileMember.name + ' ' + profileMember.surname,
            [profileMember.id]
        )
        navigate(DIALOG__ROUTE + '/' + response.data.data[0].id)
    }

    const generateGeneralChat = () => {
        setModalChat(true)
    }

    return (
        <div className={'profile-member-head'}>
            <div className='profile-member-head__row'>
                <div className='profile-member-head__column profile-member-head__column_col-1'>
                    <div className='profile-member-head__avatar'>
                        {profileMember.avatar && (
                            <img
                                src={IMAGE_URL + 'avatars/' + profileMember.avatar}
                                alt='avatar'
                            />
                        )}
                        {!profileMember.avatar && <img src={avatar} alt='avatar'/>}
                    </div>
                    <div className='profile-member-head__user-name title'>
                        {profileMember.name}
                    </div>
                </div>
                {profile?.id !== profileMember.id && (
                    <div className='profile-member-head__column'>
                        <div onClick={goChat}>
                            <img src={icon_chat} alt='chat'/>
                        </div>
                    </div>
                )}
            </div>
            {((profile?.role === 1 || profile?.role === 2) && profile?.id !== profileMember.id) && (
                <div className='profile-member-head__row'>
                    <button
                        className='profile-member-head__button _button-dark-yellow'
                        onClick={generateGeneralChat}
                    >
                        Добавить в общий чат
                    </button>
                </div>
            )}
            {modalChat && (
                <ModalChat
                    active={modalChat}
                    setActive={setModalChat}
                    idUser={profileMember.id}
                />
            )}
        </div>
    )
}
