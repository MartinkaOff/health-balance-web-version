import React, {FC} from 'react';
import {KeysDynamics} from "../../models/IHealthIndex";
import {Bar} from "react-chartjs-2";
import {optionsChartBar} from "../Charts/Chart-options";
import {months} from "../../utils/globalConstants";
import {useAppSelector} from "../../hooks/redux-hooks";
import {currentResultIndexSelector} from "../../Redux/slice/healthIndexSlice";

interface IChartIndex {
    itemIndex: KeysDynamics,
    displayGraph: any
}

export const ChartIndex: FC<IChartIndex> = ({itemIndex,displayGraph}) => {

    const currentResultIndex = useAppSelector(currentResultIndexSelector)

    const getValueIndex = (param: KeysDynamics) => currentResultIndex && currentResultIndex[param]

    const monthOfLastPassage = currentResultIndex && ` ${months[new Date(currentResultIndex.date * 1000).getMonth()]} 
        ${new Date(currentResultIndex.date * 1000).getFullYear()}`

    let translateIndex: { [key in KeysDynamics]?: string } = {
        biological_age: 'Биологический возраст',
        body_mass_index: 'Индекс массы тела',
        physical_activity: 'Физическая активность',
        nutrition_risk: 'Правильное питание',
        cholesterol_risk: 'Холестерин',
        alcohol_risk: 'Алколизм',
        depression_risk: 'Депрессия',
        stress_risk: 'Стресс',
        oncology_risk: 'Онкология',
        chronic_risk: 'Хронические заболевания',
        cardio_risk: 'Кардио риск',
        diabetes_risk: 'Диабет',
        burnout_risk: 'Уровень выгорания',
        presenteism: 'Презентизм',
        glucose_risk: 'Уровень глюкозы в крови'
    }


    return (
        <div className='dynamics-index'>
            <div className='dynamics-index__chart'>
                <h3>{translateIndex[itemIndex as KeysDynamics]}</h3>
                <Bar options={optionsChartBar} data={displayGraph(itemIndex as KeysDynamics)}/>
            </div>
            <div className={'dynamics-index__info'}>
                <div className='dynamics-index__value'>
                    {getValueIndex(itemIndex as KeysDynamics)}
                </div>
                <div className='dynamics-index__text'>
                    Показатель на <span>{monthOfLastPassage}</span>
                </div>
            </div>
        </div>
    );
};
