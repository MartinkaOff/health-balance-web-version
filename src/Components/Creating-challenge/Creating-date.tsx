import './creating-challenge.scss'
import DatePicker, {registerLocale} from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {creatingChallengeSelector, setDataChallenge} from '../../Redux/slice/challengeSlice'
import {KeysCreatingChallenge} from "../../models/IChallenge";

registerLocale('ru', ru)

export const CreatingDate = () => {

    const dispatch = useAppDispatch()

    const {start_date, end_date} = useAppSelector(creatingChallengeSelector)

    const durationChallenge = `${start_date && (start_date as Date).toLocaleDateString()} - 
    ${end_date ? (end_date as Date).toLocaleDateString() : ''}`


    const changePeriod = (dates: [(Date | null), (Date | null)]) => {
        const [start, end] = dates
        dispatch(setDataChallenge({
            name: "start_date" as KeysCreatingChallenge,
            value: start
        }))
        dispatch(setDataChallenge({
            name: "end_date" as KeysCreatingChallenge,
            value: end
        }))
    }

    return (
        <div className={'creating-date'}>
            <div className='creating-date__title creating-title'>Даты</div>
            <div className='creating-date__sub-title creating-sub-title'>
                Продолжительность челленджа
                <span>{durationChallenge}</span>
            </div>
            <div className='creating-date__calendar'>
                <DatePicker
                    onChange={changePeriod}
                    selectsRange
                    inline
                    startDate={start_date as Date}
                    endDate={end_date as Date}
                    dateFormat='dd.MM.yyyy'
                    locale={ru}
                />
            </div>
        </div>
    )
}
