import axios from 'axios'
import { LOGIN_ROUTE } from '../provider/constants-route'
import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import Pedometer from '../plugins/pedometer'

export const API_URL = process.env.REACT_APP_BASE_URL

export const $api = axios.create({ baseURL: API_URL })

$api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error?.response?.data?.errors === 'Invalid token') {
      if (Capacitor.getPlatform() === 'android') {
        await GoogleAuth.signOut()
        await Pedometer.reset()
        await Pedometer.stop()
      }
      localStorage.clear()
      window.location.replace(LOGIN_ROUTE)
    }

    return Promise.reject(error)
  }
)

export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL

export const DOC_URL = process.env.REACT_APP_DOC_URL
