import './important-block.scss'
import handIcon from '../../assets/image/hand-right.png'

export const ImportantBlock = () => {
  return (
    <div className={'important-block'}>
      <div className='important-block__container'>
        <div className='important-block__icon'>
          <img src={handIcon} alt='icon-hand' />
        </div>
        <div className='important-block__info'>
          <div className='important-block__title'>ВАЖНО!!!</div>
          <div className='important-block__text'>
            Примите участие в первом челлендже от HealthBalance
          </div>
        </div>
      </div>
    </div>
  )
}
