import './steps-data.scss'
import arrowDanger from '../../assets/image/Arrow.svg'
import arrowSuccess from '../../assets/image/Arrow-success.png'
import { useAppSelector } from '../../hooks/redux-hooks'
import { stepsPerDaySelector } from '../../Redux/slice/appSlice'
import { purposeSelector } from '../../Redux/slice/purposeSlice'
import { sklonenie } from '../../utils/common-functions'

export const StepsData = () => {
  const purpose = useAppSelector(purposeSelector)
  const steps = useAppSelector(stepsPerDaySelector)

  const indexWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  let currentProgressPurpose =
    purpose && steps
      ? steps.statistic[indexWeek]?.finished
        ? 100
        : (
            (steps.statistic[indexWeek]?.quantity * 100) /
            purpose?.quantity
          ).toFixed(2)
      : 0

  return (
    <div className={'steps-data'}>
      <div className='steps-data__content'>
        <article className='steps-data__card'>
          <div className='steps-data__value'>{currentProgressPurpose}%</div>
          <div className='steps-data__text'>
            Цель: <br />
            <span>
              {purpose?.quantity}
              {purpose?.quantity &&
                sklonenie(purpose?.quantity, [' шаг', ' шага', ' шагов'])}
            </span>
          </div>
        </article>
        <article className='steps-data__card average'>
          <div className='steps-data__value'>
            {steps.difference !== 0 ? (
              <img
                src={steps.difference > 0 ? arrowSuccess : arrowDanger}
                alt='arrow'
              />
            ) : (
              ''
            )}
          </div>
          {steps.difference === 0 ? (
            <div className='steps-data__text'>
              Шагов пройдено столько же, сколько и в прошлый раз
            </div>
          ) : (
            <div className='steps-data__text'>
              {'на '}{' '}
              <span>
                {Math.abs(steps.difference)}
                {sklonenie(Math.abs(steps.difference), [
                  ' шаг',
                  ' шага',
                  ' шагов'
                ])}
                {steps.difference > 0 ? ' больше' : ' меньше'},
              </span>
              чем в прошлый раз
            </div>
          )}
        </article>
        <article className='steps-data__card'>
          <div className='steps-data__value'>
            <span>
              +{steps.statistic[indexWeek]?.finished ? purpose?.reward : 0}
            </span>
          </div>
          <div className='steps-data__text'>
            <span>Health coin</span> <br />
            получено
          </div>
        </article>
      </div>
    </div>
  )
}
