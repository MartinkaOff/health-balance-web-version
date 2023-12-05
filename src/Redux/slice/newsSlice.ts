import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {ICreatingNews, KeysCreatingNews} from '../../models/INews'
import moment from "moment";

export interface INewsSlice {
    creatingNews: ICreatingNews,
    previewImage: string
}

const initialState: INewsSlice = {
    creatingNews: {
        annotation: '',
        content: '',
        image: '',
        title: '',
        category: 0,
        created_at: moment().unix(),
        push: 0,
        challenge: 0,
        team:0
    },
    previewImage: ''
}


export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setPreviewImage: (state, action) => {
            state.previewImage = action.payload
        },
        handlerNews: (state, action: PayloadAction<{
            name: KeysCreatingNews,
            value: number | string
        }>) => {
            state.creatingNews = {...state.creatingNews, [action.payload.name]: action.payload.value}
        },
        resetDataNews: (state) => {
            state.creatingNews = initialState.creatingNews
            state.previewImage = ''
        }
    }
})

export const {
    resetDataNews,
    handlerNews,
    setPreviewImage
} = newsSlice.actions

export const creatingNewsSelector = (state: RootState) =>
    state.news.creatingNews
export const previewImageSelector = (state: RootState) =>
    state.news.previewImage
export default newsSlice.reducer
