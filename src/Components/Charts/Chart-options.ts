import type { ChartArea } from 'chart.js';
import { nFormatter } from '../../utils/common-functions';

const startDateWeek = new Date()
startDateWeek.setDate(startDateWeek.getDate() - 7 * 7)
const startDateMonth = new Date()
startDateMonth.setMonth(startDateMonth.getMonth() - 12)


export const periodWeek = {
    end_date: new Date().toLocaleDateString(),
    start_date: startDateWeek.toLocaleDateString(),
    type: 1
}
export const periodMonth = {
    end_date: new Date().toLocaleDateString(),
    start_date: startDateMonth.toLocaleDateString(),
    type: 2
}


export const optionsChartBar:any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'none',
        },
    },
    scales:{
        xAxis: {
            grid: {
                display: false,
            },
            ticks: {
                color: "#999999",
            }
        },
        y: {
            grid: {
                lineWidth: 0.5,
                color: "#404040",
                borderDash: [3],
            },
            position: "right",
            border: 'none',
            ticks: {
                fontSize: 13,
                beginAtZero: true,
                color: "#DCDCDC",
              //  stepSize: 10000/3,
                callback: function(label:number) {
                    return nFormatter(label,1);
                }}
        },
    }
};

export const getGradient = (ctx:any, chartArea:ChartArea, colorOne:string, colorTwo:string) => {

    const gradientBg = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradientBg.addColorStop(0, colorOne);
    gradientBg.addColorStop(1, colorTwo);
    return gradientBg;
}
