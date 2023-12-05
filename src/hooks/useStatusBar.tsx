import { SafeArea } from 'capacitor-plugin-safe-area'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './redux-hooks'
import { setHeightStatusBar } from '../Redux/slice/appSlice'

export const useStatusBar = () => {
  const [insetsHeight, setInsetsHeight] = useState<number>(0)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)
  const dispatch = useAppDispatch()
  useEffect(() => {
    SafeArea.getSafeAreaInsets().then((data) => {
      setInsetsHeight(data.insets.top)
    })
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      setStatusBarHeight(statusBarHeight)
    })
    dispatch(setHeightStatusBar(insetsHeight + statusBarHeight + 20))
  }, [insetsHeight,statusBarHeight])  

  return insetsHeight + statusBarHeight + 20
}
