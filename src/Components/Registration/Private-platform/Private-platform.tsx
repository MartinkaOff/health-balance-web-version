import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import {
	privatePlatformSelector,
	setCodePlatform,
	setStage
} from '../../../Redux/slice/authSlice'
import Button, { typesButton } from '../../../UI-Components/Button/Button'
import { stageRegistration } from '../../../utils/enums'

interface IPrivatePlatform {
	googleAuth?: boolean
 }
 

export const Privateplatform:FC<IPrivatePlatform> = ({googleAuth = false}) => {

	const dispatch = useAppDispatch()
	const codePlatform = useAppSelector(privatePlatformSelector)
	const [disable, setDisabled] = useState<boolean>(false)

	const handlerCodePlatform = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setCodePlatform(e.target.value.replace(/\D/, '')))
	}

	useEffect(() => {
		if (!codePlatform) {
			setDisabled(true)
			return
		}
		setDisabled(false)
	}, [codePlatform])


	return (
		<>
			<div style={{ position: 'relative' }}>
				<input
					type='number'
					className='registration__field _field'
					value={codePlatform || ''}
					onChange={handlerCodePlatform}
				/>
			</div>
			{!googleAuth && <Button
				disabled={disable}
				customClass='registration__button'
				view={typesButton.white}
				onClick={() => dispatch(setStage(stageRegistration.photo))}
			>Завершить регистрацию</Button>}
		</>
	)
}

