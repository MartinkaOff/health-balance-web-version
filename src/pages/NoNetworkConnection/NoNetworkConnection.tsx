import React, { FC, Dispatch, useEffect } from 'react'
import './NoNetworkConnection.scss'
import { Steps } from '../../Components/Steps/Steps'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { currentStepsCountSelector, setCurrentStepsCount } from '../../Redux/slice/appSlice'
import Pedometer from '../../plugins/pedometer'
import { Capacitor } from '@capacitor/core'

interface INoNetworkConnection {
	setConnect: Dispatch<boolean>
}

export const NoNetworkConnection: FC<INoNetworkConnection> = ({ setConnect }) => {

	const currentStepsCount = useAppSelector(currentStepsCountSelector)
	const dispatch = useAppDispatch()
	const user = localStorage.getItem('token')


	const checkNetworkConnection = () => {
		if (window.navigator.onLine) {
			setConnect(true)
		}
	}

	const startPlugin = async () => {
		let savedData = await Pedometer.getSavedData()
		let steps = savedData['numberOfSteps'] || '0'
		dispatch(setCurrentStepsCount(steps))
		window.addEventListener('stepEvent', updateSteps)
	}

	const updateSteps = async (event: any) => {
		dispatch(setCurrentStepsCount(parseInt(event.numberOfSteps)))
	}

	useEffect(() => {
		if (Capacitor.getPlatform() === 'android') {
			startPlugin()
		}
		return () => {
			window.removeEventListener('stepEvent', updateSteps)
		}
	}, [])

	return (
		<div className='NoNetworkConnection'>
			{user&&<Steps maxStepsCount={0}
				userStepsCount={currentStepsCount} />}
			<div className="NoNetworkConnection__text">
				Соединение с интернетом отсутствует
			</div>
			<button className="NoNetworkConnection__button _button-dark" onClick={checkNetworkConnection}>Повторить попытку</button>
		</div>
	)
}
