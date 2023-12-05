import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from './slice/appSlice'
import { challengeSlice } from './slice/challengeSlice'
import { healthIndexSlice } from './slice/healthIndexSlice'
import { authSlice } from './slice/authSlice'
import { accessRecoverySlice } from './slice/accessRecoverySlice'
import { profileSlice } from './slice/profileSlice'
import { shopSlice } from './slice/shopSlice'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { visitedPagesSlice } from './slice/visitedPageSlice'
import { lessonsSlice } from './slice/lessonsSlice'
import { purposesSlice } from './slice/purposeSlice'
import { newsSlice } from './slice/newsSlice'
import { slice } from './Tracker/slice'
import { settingsSlice } from './slice/settingsSlice'
import { api } from '../services/api'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['shop', 'settings', 'visitedPages']
}

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
  challenges: challengeSlice.reducer,
  recovery: accessRecoverySlice.reducer,
  profile: profileSlice.reducer,
  shop: shopSlice.reducer,
  visitedPages: visitedPagesSlice.reducer,
  lessons: lessonsSlice.reducer,
  purposes: purposesSlice.reducer,
  news: newsSlice.reducer,
  tracker: slice.reducer,
  healthIndex: healthIndexSlice.reducer,
  settings: settingsSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/clearResults') {
    state = undefined
  }
  return persistedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
