import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IVisitedSlice {
  challengePage: {
    visitCount: number
  }
  trackerPage: {
    visitCount: number
  }
  newChallengeInfoPage: any
  activityPage: {
    visitCount: number
  }
  indexPage: any
}

const initialState: IVisitedSlice = {
  challengePage: {
    visitCount: 0,
  },
  trackerPage: {
    visitCount: 0
  },
  newChallengeInfoPage: {
    firstChallange: true
  },
  activityPage: {
    visitCount: 0
  },
  indexPage: {
    answers: []
  }
}

export const visitedPagesSlice = createSlice({
  name: 'visitedPages',
  initialState,
  reducers: {
    setVisitedChallengePage: (state, action) => {
      state.challengePage.visitCount = action.payload
    },
    setVisitedTrackerPage: (state, action) => {
      state.trackerPage.visitCount = action.payload
    },
    setStoreFirstChallenge: (state) => {
      state.newChallengeInfoPage.firstChallange = false
    },
    // setShowFirstChallengeInstruction: (state, action) => {
    //   state.challengePage.challengeCount = action.payload
    // },
    setVisitedActivityPage: (state, action) => {
      state.activityPage.visitCount = action.payload
    },
    addIndexPageAnswer: (state, action) => {
      state.indexPage.answers = [...state.indexPage.answers, action.payload]
    },
    resetIndexPageAnswer: (state) => {
      state.indexPage.answers = []
    }
  }
})

export const {
  setStoreFirstChallenge,
  addIndexPageAnswer,
  resetIndexPageAnswer,
  setVisitedActivityPage,
  setVisitedChallengePage,
  setVisitedTrackerPage
} = visitedPagesSlice.actions

export const trackerVisitSelector = (state: RootState) =>
  state.visitedPages.trackerPage.visitCount
export const activityVisitSelector = (state: RootState) =>
  state.visitedPages.activityPage.visitCount
  export const challengeVisitSelector = (state: RootState) =>
  state.visitedPages.challengePage.visitCount

export default visitedPagesSlice.reducer
