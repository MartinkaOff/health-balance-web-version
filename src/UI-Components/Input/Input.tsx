import { forwardRef } from 'react'

interface IInputProps extends React.ComponentProps<'input'> {
  customClass?: string
  marginBotom?: number
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <input
      className={props?.customClass + ' _field'}
      style={{
        marginBottom: props.marginBotom || 0
      }}
      {...props}
      ref={ref}
    />
  )
})

export default Input
