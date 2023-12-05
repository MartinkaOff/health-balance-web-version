interface IQuestions {
    id: number;
    tag: string;
    question: string;
    answer_type: number;
    answers: {
        position: number;
        value: string;
    }[];
}

export interface IQuestionnaire {
    id: number;
    name: string;
    questions: IQuestions[];
}

export interface IGetProgressAndIDPolls {
    id: number;
    progress: number;
    created_at: number;
}


export interface IDynamics {
    id: number;
    poll_id: number;
    biological_age: number;
    body_mass_index: number;
    physical_activity: number;
    nutrition_risk: number;
    cholesterol_risk: number;
    alcohol_risk: number;
    depression_risk: number;
    stress_risk: number;
    oncology_risk: number;
    chronic_risk: number;
    cardio_risk: number;
    burnout_risk: number;
    presenteism: number;
    glucose_risk: number;
    date: number,
    diabetes_risk: number
}

export type KeysDynamics = keyof IDynamics;

export interface IListReport {
    date: number;
    id: number
}

export interface ISaveCurrentResult {
    id: number,
    answers: string
}

export interface IIndicators {
    title: string,
    value: number,
    criticalValue: number,
    averageValue: number,
    tag: string
}