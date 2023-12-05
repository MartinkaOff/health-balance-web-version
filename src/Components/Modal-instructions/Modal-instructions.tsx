import { FC } from 'react'
import './modal-instructions.scss'

interface IModalInstructions {
  positionTop: number
  text: string
  fontSize?: number
  fontWeight?: number
}

export const ModalInstructions: FC<IModalInstructions> = ({
  text,
  positionTop,
  fontSize,
  fontWeight
}) => {
  return (
    <div className={'modal-instructions'}>
      <div
        className='modal-instructions__text'
        style={{ top: positionTop, fontSize: fontSize, fontWeight: fontWeight }}
      >
        {text}
      </div>
    </div>
  )
}
