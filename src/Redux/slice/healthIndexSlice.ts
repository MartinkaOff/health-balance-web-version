import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {healthIndexApi} from "../../services/healthIndex.api";
import {IDynamics, IIndicators, IQuestionnaire,} from "../../models/IHealthIndex";

interface IHealthIndex {
    questionnaire: IQuestionnaire[];
    answers: any;
    progress: number;
    idPoll: number;
    currentResultIndex: IDynamics | null,
    indicators: IIndicators[],
    riskOfDiseases: {
        title: string,
        value: number | undefined,
        tag: string
    }[],

}

const initialState: IHealthIndex = {
    questionnaire:[],
    progress: 0,
    answers: [],
    idPoll: 0,
    currentResultIndex: null,
    indicators: [],
    riskOfDiseases: []

};


export const healthIndexSlice = createSlice({
    name: "healthIndex",
    initialState,
    reducers: {
        addIndexPageAnswer: (state, action) => {
            state.answers = [...state.answers, action.payload];
        },
        resetAnswers: (state) => {
            state.answers = [];
        },
        resetQuestionnaire: (state) => {
            state.questionnaire = [];
        },
    },
    extraReducers: (builder) => {
        //получение текущей анкеты, ее прогресс и id
        builder.addMatcher(healthIndexApi.endpoints.getProgressAndIdPolls.matchFulfilled,
            (state, action) => {
                state.progress = action.payload.progress - 1;
                state.idPoll = action.payload.id;
            }
        );
        //сохранение результата, обновление прогресса анкеты
        builder.addMatcher(healthIndexApi.endpoints.saveCurrentResult.matchFulfilled,
            (state, action) => {
                state.progress = action.payload.data.progress - 1;
            }
        );

        //запись результата последнего прохождения и создание массивов под риски и показатели
        builder.addMatcher(healthIndexApi.endpoints.getDynamics.matchFulfilled, (state, action) => {
            const lastDynamic = action.payload[action.payload.length - 1]
            state.currentResultIndex = lastDynamic;
            state.indicators = [
                {
                    title: "Уровень глюкозы в крови",
                    value: lastDynamic?.glucose_risk || 0,
                    criticalValue: 3,
                    averageValue: 2,
                    tag: 'glucose_risk'
                },
                {
                    title: "Индекс массы тела",
                    value: lastDynamic?.body_mass_index || 0,
                    criticalValue: 30,
                    averageValue: 16,
                    tag: 'body_mass_index'
                },
                {
                    title: "Физическая активность",
                    value: lastDynamic?.physical_activity || 0,
                    criticalValue: 1,
                    averageValue: 2,
                    tag: 'physical_activity'
                },
                {
                    title: "Правильное питание",
                    value: lastDynamic?.nutrition_risk || 0,
                    criticalValue: 3,
                    averageValue: 2,
                    tag: 'nutrition_risk'
                },
            ]
            state.riskOfDiseases = [
                {
                    title: 'Сахарный диабет',
                    value: lastDynamic?.diabetes_risk,
                    tag: 'diabetes_risk'
                },
                {
                    title: 'Онкология',
                    value: lastDynamic?.oncology_risk,
                    tag: 'oncology_risk'

                },
                {
                    title: 'Алкоголизм',
                    value: lastDynamic?.alcohol_risk,
                    tag: 'alcohol_risk'
                },
                {
                    title: 'Депрессия',
                    value: lastDynamic?.depression_risk,
                    tag: 'depression_risk'
                },
                {
                    title: 'Сердечно-сосудистые',
                    value: lastDynamic?.cardio_risk,
                    tag: 'cardio_risk'
                },
                {
                    title: 'Хронические заболевания',
                    value: lastDynamic?.chronic_risk,
                    tag: 'chronic_risk'
                },
                {
                    title: 'Холестерин',
                    value: lastDynamic?.cholesterol_risk,
                    tag: 'cholesterol_risk'
                },
                {
                    title: 'Стресс',
                    value: lastDynamic?.stress_risk,
                    tag: 'stress_risk'
                },
                {
                    title: 'Уровень выгорания',
                    value: lastDynamic?.burnout_risk,
                    tag: 'burnout_risk'
                },
                {
                    title: 'Презентеизм',
                    value: lastDynamic?.presenteism,
                    tag: 'presenteism'
                }
            ]
        })
    }
});

export const {addIndexPageAnswer, resetAnswers, resetQuestionnaire} = healthIndexSlice.actions;


export const answersQuestionnaireSelector = (state: RootState) => state.healthIndex.answers;
export const progressPollSelector = (state: RootState) => state.healthIndex.progress;
export const idPolleSelector = (state: RootState) => state.healthIndex.idPoll;
export const currentResultIndexSelector = (state: RootState) => state.healthIndex.currentResultIndex;
export const indicatorsSelector = (state: RootState) => state.healthIndex.indicators;
export const riskOfDiseasesSelector = (state: RootState) => state.healthIndex.riskOfDiseases;

export default healthIndexSlice.reducer;
