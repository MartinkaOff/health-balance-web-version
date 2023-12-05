import { FC } from 'react'
import './registration.scss'
import { stageRegistration } from '../../utils/enums'
import { Platform } from './Platform'
import { SurName } from './SurName'
import { NameUser } from './NameUser'
import { Gender } from './Gender'
import { Birthday } from './Birthday'
import { Telephone } from './Telephone'
import { Password } from './Password'
import { Email } from './Email'
import { SetPhoto } from './Set-photo'
import { TrackerConnection } from './Tracker-connection'
import { Privateplatform } from './Private-platform/Private-platform'

interface IRegistrationItem {
  title: string
  stage: string

}

export const RegistrationItem: FC<IRegistrationItem> = ({
  title,
  stage
}) => {
  const renderField = () => {
    switch (stage) {
      case stageRegistration.email:
        return <Email />
      case stageRegistration.password:
        return <Password />
      case stageRegistration.phone:
        return <Telephone />
      case stageRegistration.birthday:
        return <Birthday />
      case stageRegistration.gender:
        return <Gender />
      case stageRegistration.userName:
        return <NameUser />
      case stageRegistration.surname:
        return <SurName />
      case stageRegistration.platform:
        return <Platform />
      case stageRegistration.privatePlatform:
        return <Privateplatform />
      case stageRegistration.photo:
        return <SetPhoto />
      case stageRegistration.tracker:
        return <TrackerConnection />
      default:
        return null
    }
  }

  return (
    <>
      <div className='registration__title'>{title}</div>
      {renderField()}
    </>
  )
}
