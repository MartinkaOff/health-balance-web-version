import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ITrack, ITracks} from "../../models/ITracker";
import {tracksSleepDaysWeek} from "../../utils/globalConstants";


interface IPayloadCurrentDay {
    date: string,
    tracks?: ITracks
}

export interface ITracker {
    currentDay: ITrack | undefined;
    dataSleep: ITrack[];
}

const initialState: ITracker = {
    dataSleep: [],
    currentDay: undefined,
};


export const slice = createSlice({
    name: "trackerSlice",
    initialState,
    reducers: {
        updateDataSleepTrack: (state, {payload}: PayloadAction<ITracks>) => {
            let difference: number = tracksSleepDaysWeek.length - payload.sleepTrack.length
            let newArraySleepTrack: ITrack[] = [...payload.sleepTrack]

            for (let i = 0; i < difference; i++) {
                const element = payload.sleepTrack[0]?.type
                newArraySleepTrack.unshift({
                    id: -i - 1,
                    type: element === 4 ? !(i % 2) ? 1 : 4 : !(i % 2) ? 4 : 1,
                    additional: tracksSleepDaysWeek[difference - i - 1].day,
                    completed: false,
                    notification_send: false,
                    send_time: 0,
                    sleep_time: 0
                })
            }
            state.dataSleep = newArraySleepTrack
        },
        setCurrentDay: (state, {payload}: PayloadAction<IPayloadCurrentDay>) => {
            const indexWeek =
                new Date(payload.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')).getDay() === 0
                    ? 6
                    : new Date(payload.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')).getDay() -
                    1
            if (payload.tracks) {
                state.currentDay = payload.tracks.sleepTrack.find(
                    (item) => item.additional === tracksSleepDaysWeek[indexWeek * 2].day && item.type === 1
                )
            }
        },
    },
    extraReducers: (builder) => {
    },
});

export const {
    updateDataSleepTrack,
    setCurrentDay,
} = slice.actions;


export const dataSleepSelector = (state: RootState) =>
    state.tracker.dataSleep;
export const currentDaySelector = (state: RootState) => state.tracker.currentDay;


export default slice.reducer;
