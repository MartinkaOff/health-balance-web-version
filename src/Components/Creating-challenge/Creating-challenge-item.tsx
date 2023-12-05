import React, { FC } from 'react'
import { stageCreatingChallenge } from '../../utils/enums'
import { SelectPlatform } from './Select-platform'
import { TypeChallenge } from './Type-challenge'
import { CreatingTargets } from './Creating-targets'
import { CreatingDate } from './Creating-date'
import { CreatingTitleChallenge } from './Creating-title-challenge'
import { CreatingDescriptionChallenge } from './Creating-description-challenge'
import { CreatingCommandsChallenge } from './Creating-commands-challenge'
import './creating-challenge.scss'
import { FinalVariant } from './Final-variant'
import { CustomersList } from './Customers-list'

interface ICreatingChallengeItem {
  stage: stageCreatingChallenge
}

export const CreatingChallengeItem: FC<ICreatingChallengeItem> = ({
  stage
}) => {
  const renderField = () => {
    switch (stage) {
      case stageCreatingChallenge.customers:
        return <CustomersList />
      case stageCreatingChallenge.platform:
        return <SelectPlatform />
      case stageCreatingChallenge.type:
        return <TypeChallenge />
      case stageCreatingChallenge.target:
        return <CreatingTargets />
      case stageCreatingChallenge.data:
        return <CreatingDate />
      case stageCreatingChallenge.title:
        return <CreatingTitleChallenge />
      case stageCreatingChallenge.description:
        return <CreatingDescriptionChallenge />
      case stageCreatingChallenge.teams:
        return <CreatingCommandsChallenge />
      case stageCreatingChallenge.finally:
        return <FinalVariant />
      default:
        return null
    }
  }

  return <form className={'creating-challenge-item'}>{renderField()}</form>
}
