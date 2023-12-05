import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  platformSelector,
  setPlatform,
  setStage,
  typePlatformSelector,
  setTypePlatform
} from '../../Redux/slice/authSlice'
import { DOC_URL } from '../../http'
import { useGetPlatformsQuery } from '../../services/platform.api'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { stageRegistration } from '../../utils/enums'

interface IPlatform {
  googleAuth?: boolean
}

export const Platform: FC<IPlatform> = ({ googleAuth = false }) => {
  const dispatch = useAppDispatch()

  const { data: listPLatforms, isError } = useGetPlatformsQuery()
  const platform = useAppSelector(platformSelector)
  const [agree, setAgree] = useState(false)
  const [disable, setDisabled] = useState<boolean>(true)
  const typePlatfotm = useAppSelector(typePlatformSelector)

  const handlerAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree((prev) => !prev)
    setDisabled(platform === 0 ? true : agree)
  }

  const handlerPlatforms = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPlatform(+e.target.value))
    dispatch(
      setTypePlatform(
        Number(e.target.options[e.target.selectedIndex].dataset.type) || 1
      )
    )
    setDisabled(+e.target.value === null ? true : !agree)
  }

  const nextStage = () => {
    if (typePlatfotm === 2) {
      dispatch(setStage(stageRegistration.privatePlatform))
      return
    }
    dispatch(setStage(stageRegistration.photo))
  }

  if (isError) {
    return <h1>Произошла ошибка...</h1>
  }

  return (
    <>
      <div className={'registration__platform'}>
        <div className='registration__select _custom-select'>
          <select
            defaultValue={platform === 0 ? 'DEFAULT' : platform}
            onChange={handlerPlatforms}
          >
            <option value={'DEFAULT'} disabled>
              Ваша платформа
            </option>
            {listPLatforms &&
              listPLatforms.data.map((p) => (
                <option value={p.id} key={p.id} data-type={p.type}>
                  {p.title}
                </option>
              ))}
          </select>
        </div>
        {!googleAuth && (
          <>
            <hr className={'registration__line'} />
            <div className='registration__necessarily'>Обязательно</div>
            <div className='registration__confidentiality confidentiality-block'>
              <div className='confidentiality-block__row custom-radio'>
                <input
                  type='checkbox'
                  id={'agree'}
                  className={'custom-radio__checkbox'}
                  onChange={handlerAgree}
                />
                <label
                  htmlFor={'agree'}
                  className='confidentiality-block__text'
                >
                  Я принимаю Условия использования и Политику <br />
                  конфиденциальности HealthBalance
                </label>
              </div>
              <a
                href={`${DOC_URL}terms.pdf`}
                className='confidentiality-block__text yellow'
                target='_blank'
                rel='noreferrer'
              >
                Условия использования
              </a>
              <a
                href={`${DOC_URL}privacy.pdf`}
                className='confidentiality-block__text yellow'
                target='_blank'
                rel='noreferrer'
              >
                Политика конфиденциальности
              </a>
            </div>
          </>
        )}
      </div>
      {!googleAuth && (
        <Button
          disabled={disable}
          customClass='registration__button'
          view={typesButton.white}
          onClick={nextStage}
        >
          {typePlatfotm === 2 ? 'Далее' : 'Завершить регистрацию'}
        </Button>
      )}
    </>
  )
}
