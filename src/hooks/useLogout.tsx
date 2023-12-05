import {clearResults} from '../Redux/slice/authSlice'
import {persistor} from '../index'
import {LOGIN_ROUTE} from '../provider/constants-route'
import {useAppDispatch, useAppSelector} from './redux-hooks'
import {Capacitor} from '@capacitor/core'
import Pedometer from '../plugins/pedometer'
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth'
import {pedometerSelector} from '../Redux/slice/settingsSlice'
import {showToast} from '../utils/common-functions'
import {useDeleteTrackerMutation} from '../services/tracker.api'
import {PEDOMETERS} from "../utils/enums";

export const useLogout = () => {
  const pedometer = useAppSelector(pedometerSelector)
  const dispatch = useAppDispatch()
  const [deleteTrackers] = useDeleteTrackerMutation()

  const clearData = async () => {
    await deleteTrackers(null)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    await dispatch(clearResults())
    await persistor.purge()
  }

  const logout = async () => {
    try {
      if (Capacitor.getPlatform() === 'android') {
        await GoogleAuth.signOut()
        if (pedometer === PEDOMETERS.healthBalance) {
          await Pedometer.reset()
          await Pedometer.stop()
        }
      }
      await clearData()
      await window.location.replace(LOGIN_ROUTE)
    } catch (error) {
      await showToast('Произошла ошибка удаления тркера')
    }
  }

  return [logout]
}
