import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {ICreatingPurpose, IPurpose} from '../../models/IPurpose'
import {purposeApi} from "../../services/purpose.api";

export interface IPurposes {
    purpose: IPurpose | null
    creatingPurpose: ICreatingPurpose
}

const initialState: IPurposes = {
    purpose: null,
    creatingPurpose: {challenge: 0, quantity: 0, reward: 0, type: 1},
}

export const purposesSlice = createSlice({
    name: 'purposes',
    initialState,
    reducers: {
        setPurposeChallenge: (state, action) => {
            state.creatingPurpose = {...state.creatingPurpose, [action.payload.name]: action.payload.value}
        },
        resetPurposeChallenge: (state) => {
            state.creatingPurpose = {
                type: 1,
                challenge: 0,
                quantity: 0,
                reward: 0
            }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(purposeApi.endpoints.getPersonalPurpose.matchFulfilled,
            (state, action) => {
                state.purpose = action.payload;
            }
        );
    }

})

export const {
    resetPurposeChallenge,
    setPurposeChallenge
} = purposesSlice.actions


export const purposeSelector = (state: RootState) => state.purposes.purpose
export const creatingPurposeSelector = (state: RootState) =>
    state.purposes.creatingPurpose

export default purposesSlice.reducer
