import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useEffect, useState } from "react";
import {
    currentStepsCountSelector, getStepsPerDay, getStepsPerMonth, getStepsPerWeek,
    monthsSelector, setMonths, setWeeks,
    stepsPerDaySelector,
    weeksSelector
} from "../../Redux/slice/appSlice";
import { purposeSelector } from "../../Redux/slice/purposeSlice";
import { getGradient, optionsChartBar, periodMonth, periodWeek } from "./Chart-options";
import { TabContent, Tabs } from "../Tabs/Tabs";
import { Bar } from "react-chartjs-2";
import { nFormatter, sklonenie } from "../../utils/common-functions";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export const Charts = () => {



    const dispatch = useAppDispatch()
    const [currentValueTab, setCurrentValueTab] = useState<number>(0)
    const namesTabsDynamics = ['Дни', 'Недели', 'Месяцы']
    const currentStepsCount = useAppSelector(currentStepsCountSelector)
    const steps = useAppSelector(stepsPerDaySelector)
    const months = useAppSelector(monthsSelector)
    const weeks = useAppSelector(weeksSelector)
    const purpose = useAppSelector(purposeSelector)
    const indexWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    const percent =
        purpose && steps.statistic
            ? steps.statistic[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
                ?.finished
                ? 100
                : (
                    (steps.statistic[indexWeek]?.quantity * 100) /
                    purpose?.quantity
                ).toFixed(2)
            : 0

    const dataDay = {
        labels: steps ? steps.statistic.map((item) => item.day) : [],
        datasets: [
            {
                data: steps ? steps.statistic.map((item) => item.quantity) : [],
                backgroundColor: function (context: any) {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    return getGradient(ctx, chartArea, '#F2994A', '#F4C119')
                },
                borderRadius: 5
            }
        ]
    }

    const dataWeek = {
        labels: weeks.map((item) => item.date).reverse(),
        datasets: [
            {
                data: weeks ? weeks.map((item) => item.count).reverse() : [],
                backgroundColor: function (context: any) {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    return getGradient(ctx, chartArea, '#56CCF2', '#CCE0F7')
                },
                borderRadius: 5
            }
        ]
    }

    const dataMonth = {
        labels: months.map((item) => item.title),
        datasets: [
            {
                data: months ? months.map((item) => item.count) : [],
                backgroundColor: function (context: any) {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null

                    return getGradient(ctx, chartArea, '#56CCF2', '#CCE0F7')
                },
                borderRadius: 5
            }
        ]
    }

    async function setDataToCharts() {
        await dispatch(getStepsPerDay())
        await dispatch(getStepsPerMonth(periodMonth))
        await dispatch(getStepsPerWeek(periodWeek))
        dispatch(setMonths())
        dispatch(setWeeks())
    }

    useEffect(() => {
        setDataToCharts()
    }, [currentStepsCount])


    return (
        <div className="dynamics__wrapper">
            <div className='dynamics__title'>Динамика</div>
            <div className='activity-page__dynamics dynamics'>
                <Tabs
                    labels={namesTabsDynamics}
                    onClick={setCurrentValueTab}
                    value={currentValueTab}
                />
                <div>
                    <TabContent index={0} value={currentValueTab} className='tabs__content-dynamics'>
                        <div className='dynamics__chart'>
                            <Bar options={optionsChartBar} data={dataDay} />
                        </div>
                        <div className={'dynamics__info'}>
                            <div className='dynamics__value'>
                                {nFormatter(steps.statistic[indexWeek]?.quantity, 2)} <br />{' '}
                                <span>
                                    {sklonenie(steps.statistic[indexWeek]?.quantity, [
                                        'шаг',
                                        'шага',
                                        'шагов'
                                    ])}
                                </span>
                            </div>
                            <div className='dynamics__value'>
                                {((steps.statistic[indexWeek]?.quantity * 0.7) / 1000).toFixed(2)}
                                <br /> <span>км</span>
                            </div>
                            <div className='dynamics__value'>
                                {percent}
                                %<br /> <span>от цели</span>
                            </div>
                        </div>
                    </TabContent>
                    <TabContent index={1} value={currentValueTab} className='tabs__content-dynamics'>
                        <div className='dynamics__chart'>
                            <Bar options={optionsChartBar} data={dataWeek} />
                        </div>
                        <div className={'dynamics__info'}>
                            <div className='dynamics__value'>
                                {nFormatter(weeks[0].count, 2)} <br />{' '}
                                <span>{sklonenie(weeks[0].count, ['шаг', 'шага', 'шагов'])}</span>
                            </div>
                            <div className='dynamics__value'>
                                {nFormatter(+((weeks[0].count * 0.7) / 1000).toFixed(2), 1)} <br />{' '}
                                <span>км</span>
                            </div>
                            <div className='dynamics__value'>
                                {percent}
                                %<br /> <span>от цели</span>
                            </div>
                        </div>
                    </TabContent>
                    <TabContent index={2} value={currentValueTab} className='tabs__content-dynamics'>
                        <div className='dynamics__chart'>
                            <Bar options={optionsChartBar} data={dataMonth} />
                        </div>
                        <div className={'dynamics__info'}>
                            <div className='dynamics__value'>
                                {nFormatter(months[new Date().getMonth()].count, 1)} <br />{' '}
                                <span>
                                    {sklonenie(months[new Date().getMonth()].count, [
                                        'шаг',
                                        'шага',
                                        'шагов'
                                    ])}
                                </span>
                            </div>
                            <div className='dynamics__value'>
                                {nFormatter(
                                    +((months[new Date().getMonth()].count * 0.7) / 1000).toFixed(2),
                                    1
                                )}
                                <br /> <span>км</span>
                            </div>
                            <div className='dynamics__value'>
                                {percent}
                                %<br /> <span>от цели</span>
                            </div>
                        </div>
                    </TabContent>
                </div>
            </div>
        </div>
    )
}