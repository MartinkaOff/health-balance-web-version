import './profile.scss'
import {IUser} from "../../models/IUsers";
import {FC} from 'react';

interface IProfileMemberContact {
  profileMember: IUser
}

export const ProfileMemberContact:FC<IProfileMemberContact> = ({profileMember}) => {

  return (
    <div className={'profile-member-contact'}>
      <div className='profile-member-contact__row'>
        <div className='profile-member-contact__caption'>Email</div>
        <div className='profile-member-contact__value title-17'>
          {profileMember.email}
        </div>
        <div className='profile-member-contact__caption'>Телефон</div>
        <div className='profile-member-contact__value title-17'>
          {profileMember.phone}
        </div>
        <div className='profile-member-contact__caption'>Дата рождения</div>
        <div className='profile-member-contact__value title-17'>
          {new Date(profileMember.birthday * 1000).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
