import { Dispatch, FC, SetStateAction } from 'react'


export interface IFurtherButton {
  order: number
  setOrder: Dispatch<SetStateAction<number>>
}

export const FurtherButton: FC<IFurtherButton> = ({ order, setOrder }) => {

  return (
    <div className='registration__nav'>
     
    </div>
  )
}

