import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {IChallenge, ICreatingChallenge,} from '../../models/IChallenge'
import {challengesApi} from '../../services/ChallengeService'
import {nFormatter} from "../../utils/common-functions";

const END_DATE = new Date()
END_DATE.setDate(END_DATE.getDate() + 3)

export interface IChallenges {
    creatingChallenge: ICreatingChallenge
    disabledButton?: boolean
    challenge_id: number
}

const initialState: IChallenges = {
    creatingChallenge: {
        platform: 0,
        title: '',
        description: '',
        type: 3,
        image: '',
        start_date: new Date(),
        end_date: END_DATE,
        team_amount: '',
        max_peoples: '',
        customers: []
    },
    disabledButton: true,
    challenge_id: 0
}

export const calculatingPercentage = (challenge :IChallenge)  => {
    const {purpose,remains_to_pass} = challenge
    return purpose && +((purpose?.quantity - remains_to_pass) * 100
        / purpose?.quantity).toFixed(1)
}

export const itemsChallengeTask = (challenge:IChallenge) => {
    const items = [{
        title: 'Обучающий материал',
        value: challenge?.homeworks || '0',
        text: challenge?.total_lessons + ' лекций',
        id: 2
    }]
    if (challenge?.purpose) {
        items.unshift({
            title: 'Шагов для завершения',
            value: nFormatter(challenge.purpose.quantity - challenge.remains_to_pass, 1),
            text: nFormatter(challenge?.purpose?.quantity || 0, 1),
            id: 1
        },)
    }
    return items
}

export const challengeSlice = createSlice({
    name: 'challengeSlice',
    initialState,
    reducers: {
        setDataChallenge: (state, action: PayloadAction<any>) => {
            state.creatingChallenge = {...state.creatingChallenge, [action.payload.name]: action.payload.value}
        },
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload
        },
        setCustomersPersonalChallenge: (state, action: PayloadAction<number>) => {
            if (!action.payload) {
                state.creatingChallenge.customers = []
                return
            }
            if ((state.creatingChallenge.customers as number[])?.includes(action.payload)) {
                state.creatingChallenge.customers =
                    (state.creatingChallenge.customers as number[]).filter(
                        (item) => item !== action.payload
                    )
            } else {
                state.creatingChallenge.customers = [
                    ...state.creatingChallenge.customers as number[],
                    action.payload
                ]
            }

        }
    },
    extraReducers: (builder) => {
        //id созданного челленджа
        builder.addMatcher(challengesApi.endpoints.creatingChallenge.matchFulfilled,
            (state, action) => {
                state.challenge_id = action.payload.challenge_id
                state.creatingChallenge = initialState.creatingChallenge
            }
        );
    }
})

export const {
    setDisabledButton,
    setCustomersPersonalChallenge,
    setDataChallenge,
} = challengeSlice.actions


export const creatingChallengeSelector = (state: RootState) =>
    state.challenges.creatingChallenge

export const disableButtonChallengeSelector = (state: RootState) =>
    state.challenges.disabledButton

export const challengeIdSelector = (state: RootState) =>
    state.challenges.challenge_id


export default challengeSlice.reducer
