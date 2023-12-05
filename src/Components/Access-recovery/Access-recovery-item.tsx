import { Dispatch, FC, SetStateAction } from 'react'
import { stageAccessRecovery } from '../../utils/enums'
import { RecoveryEmail } from './Recovery-email'
import { FurtherRecoveryButton } from './Further-recovery-button'
import { RecoveryPassword } from './Recovery-password'

interface IAccessRecoveryItem {
  stage: stageAccessRecovery
  order: number
  setOrder: Dispatch<SetStateAction<number>>
}

export const AccessRecoveryItem: FC<IAccessRecoveryItem> = ({
  stage,
  order,
  setOrder
}) => {
  const renderField = () => {
    switch (stage) {
      case stageAccessRecovery.email:
        return <RecoveryEmail />
      case stageAccessRecovery.password:
        return <RecoveryPassword />
      default:
        return null
    }
  }

  return (
    <>
      {renderField()}
      <FurtherRecoveryButton setOrder={setOrder} order={order} />
    </>
  )
}
