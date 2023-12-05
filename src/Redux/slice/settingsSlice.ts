import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {PEDOMETERS} from "../../utils/enums";
import google from "../../assets/image/syncing/Google-fit.png";
import plug from "../../assets/image/plug.png";


interface IPedometers {
    value: PEDOMETERS,
    title: string,
    icon: string,
}

export const pedometers:IPedometers[] = [
        {
            value: PEDOMETERS.googleFit,
            title: 'Google fit',
            icon: google,
        },
        {
            value: PEDOMETERS.healthBalance,
            title: 'Health Balance',
            icon: plug,
        }
    ]

export interface ISettingsSlice {
    pedometer: PEDOMETERS;
}

const initialState: ISettingsSlice = {
    pedometer: PEDOMETERS.googleFit,
};

export const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        setPedometer: (state, action:PayloadAction<PEDOMETERS>) => {
            state.pedometer = action.payload;
        },
    }
});

export const {setPedometer} = settingsSlice.actions;

export const pedometerSelector = (state: RootState) => state.settings.pedometer;

export default settingsSlice.reducer;
