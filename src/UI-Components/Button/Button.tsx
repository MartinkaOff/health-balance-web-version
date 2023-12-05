import { forwardRef } from 'react'

export enum typesButton {
  yellow = '_button-yellow',
  white = '_button-white'
}

interface IButtonProps extends React.ComponentProps<'button'> {
  view: typesButton
  customClass?: string
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ customClass, view, ...props }, ref) => {
    const isDisabled = props.disabled ? ' disabled' : ''
    return (
      <button
        className={view + isDisabled + ' ' + customClass}
        {...props}
        ref={ref}
      >
        {props.children}
      </button>
    )
  }
)

export default Button
