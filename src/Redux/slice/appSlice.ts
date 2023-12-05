import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import AppService from '../../services/AppService'
import { IStepsPerDay } from '../../models/IApp'
import { getWeek } from '../../utils/common-functions'
import {healthIndexApi} from "../../services/healthIndex.api";
import {api} from "../../services/api";

interface AppState {
  balance: number
  currentStepsCount: number
  steps: { statistic: IStepsPerDay[]; difference: number }
  months: {
    id: number
    title: string
    count: number
  }[]
  weeks: {
    id: number
    date: string
    count: number
    numberWeek: number
    year: number | null
  }[]
  monthData: {}
  weekData: {}
  heightStatusBar: number,
  timeUserTimestamp: number
}

const initialState: AppState = {
  balance: 0,
  timeUserTimestamp: new Date().getTime(),
  heightStatusBar: 0,
  currentStepsCount: 0,
  steps: { difference: 0, statistic: [] },
  months: [
    {
      id: 1,
      title: 'Янв',
      count: 0
    },
    {
      id: 2,
      title: 'Фев',
      count: 0
    },
    {
      id: 3,
      title: 'Мар',
      count: 0
    },
    {
      id: 4,
      title: 'Апр',
      count: 0
    },
    {
      id: 5,
      title: 'Май',
      count: 0
    },
    {
      id: 6,
      title: 'Июн',
      count: 0
    },
    {
      id: 7,
      title: 'Июл',
      count: 0
    },
    {
      id: 8,
      title: 'Авг',
      count: 0
    },
    {
      id: 9,
      title: 'Сен',
      count: 0
    },
    {
      id: 10,
      title: 'Окт',
      count: 0
    },
    {
      id: 11,
      title: 'Ноя',
      count: 0
    },
    {
      id: 12,
      title: 'Дек',
      count: 0
    }
  ],
  weeks: [
    {
      id: 1,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    },
    {
      id: 2,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    },
    {
      id: 3,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    },
    {
      id: 4,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    },
    {
      id: 5,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    },
    {
      id: 6,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    },
    {
      id: 7,
      count: 0,
      numberWeek: 0,
      year: null,
      date: ''
    }
  ],
  monthData: {},

  weekData: {}
}


export const getBalance = createAsyncThunk('balance', async () => {
  const response = await AppService.getBalance()
  return response.data.data.balance
})

export const getStepsPerDay = createAsyncThunk('getStepsPerDay', async () => {
  const response = await AppService.getStepsPerDay()
  return response.data.data
})

export const getStepsPerWeek = createAsyncThunk(
  'getStepsPerWeek',
  async (data: any) => {
    const { start_date, end_date, type } = data
    const response = await AppService.getStepsPerWeekAndMonth(
      start_date,
      end_date,
      type
    )
    return response.data.data
  }
)
export const getStepsPerMonth = createAsyncThunk(
  'getStepsPerMonth',
  async (data: any) => {
    const { start_date, end_date, type } = data
    const response = await AppService.getStepsPerWeekAndMonth(
      start_date,
      end_date,
      type
    )
    return response.data.data
  }
)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentStepsCount(state, action) {
      state.currentStepsCount = action.payload
    },

    setMonths: (state) => {
      let array = state.monthData ? Object.values(current(state.monthData)) : []
      const year: any = array[array?.length - 1]
      array.length &&
        Object.keys(year).map((month: any, index: number) => {
          state.months = state.months.map((label) =>
            label.id === +month
              ? { ...label, count: Number(Object.values(year)[index]) }
              : label
          )
        })
    },
    setWeeks: (state) => {
      let weekNow = getWeek(new Date())
      let array = state.weekData ? Object.values(state.weekData) : null
      array &&
        array.length &&
        array.forEach((year: any, i) => {
          Object.keys(year).map((week: any, index: number) => {
            state.weeks = state.weeks.map((item, indexWeek) => {
              let dateWeekNow = new Date(state.steps.statistic[0].date * 1000)
              let numberWeek =
                weekNow[1] - indexWeek <= 0
                  ? 52 - (indexWeek - weekNow[1])
                  : weekNow[1] - indexWeek

              return {
                ...item,
                date: new Date(
                  dateWeekNow.setDate(dateWeekNow.getDate() - 7 * indexWeek)
                )
                  .toLocaleDateString()
                  .slice(0, -5),
                numberWeek: numberWeek,
                count:
                  numberWeek === +Object.keys(year)[index]
                    ? Number(Object.values(year)[index])
                    : item.count
              }
            })
          })
        })
    },
    setHeightStatusBar: (state, action: PayloadAction<number>) => {
      state.heightStatusBar = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload
    })
    builder.addCase(
      getStepsPerDay.fulfilled,
      (
        state,
        action: PayloadAction<{ statistic: IStepsPerDay[]; difference: number }>
      ) => {
        state.steps.statistic = Object.values(action.payload.statistic)
        state.steps.difference = action.payload.difference
      }
    )
    builder.addCase(getStepsPerDay.rejected, (state, action) => {
      state.steps = { difference: 0, statistic: [] }
    })
    builder.addCase(getStepsPerMonth.fulfilled, (state, action) => {
      state.monthData = action.payload
    })
    builder.addCase(getStepsPerWeek.fulfilled, (state, action) => {
      state.weekData = action.payload
    })

    builder.addMatcher(api.endpoints.getUserTime.matchFulfilled,
        (state, action) => {
          state.timeUserTimestamp = action.payload
        }
    );
  }
})

export const { setMonths, setWeeks, setCurrentStepsCount, setHeightStatusBar } =
  appSlice.actions

export const balanceSelector = (state: RootState) => state.app.balance
export const stepsPerDaySelector = (state: RootState) => state.app.steps
export const monthsSelector = (state: RootState) => state.app.months
export const weeksSelector = (state: RootState) => state.app.weeks
export const heightStatusBarSelector = (state: RootState) =>
  state.app.heightStatusBar
export const currentStepsCountSelector = (state: RootState) =>
  state.app.currentStepsCount
export const timeUserTimestampSelector = (state: RootState) =>
    state.app.timeUserTimestamp

export default appSlice.reducer
