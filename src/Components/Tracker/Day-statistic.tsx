import {FC} from "react";
import icon_dream from "../../assets/image/tracker/icon-dream.svg";
import icon_fruit from "../../assets/image/tracker/icon-fruit.svg";
import icon_water from "../../assets/image/tracker/icon-water.svg";
import {currentDaySelector} from "../../Redux/Tracker/slice";
import {sklonenie} from "../../utils/common-functions";
import {useAppSelector} from "../../hooks/redux-hooks";
import {useGetTracksQuery} from "../../services/tracker.api";


interface IDayStatistic {
  date: string;
}

const DayStatistic: FC<IDayStatistic> = ({ date }) => {

  const {data:tracks} = useGetTracksQuery(date)

  const water  = tracks?.waterTrack.filter(item => item.completed) || []
  const fruits  = tracks?.fruitTrack.filter(item => item.completed) || []
  const currentDay = useAppSelector(currentDaySelector)

  return (
    <div className="day-statistic-wrapper">
      <div className="day-statistic-wrapper__title">{date}</div>
      <div className="day-statistic-wrapper__stat">
        <div  style={{color: (currentDay?.sleep_time! >= 8)?'#00A62E':'#F4C119'}}>
          <img src={icon_dream} alt="" /> {(currentDay?.sleep_time! >= 8)
                ? currentDay?.sleep_time + sklonenie(currentDay?.sleep_time!, [' час', ' часа', ' часов'])
                : 'менее 8 часов'}
        </div>
        <div style={{ color: "#00A62E" }}>
          <img src={icon_water} alt="" />
          {tracks?.waterTrack.length ? (water.length*100/tracks.waterTrack.length).toFixed(): 0}%
        </div>
        <div style={{ color: "#F4C119" }}>
          <img src={icon_fruit} alt="" />
          {tracks?.fruitTrack.length ? (fruits.length*100/tracks.fruitTrack.length).toFixed(): 0}%
        </div>
      </div>
    </div>
  );
};

export default DayStatistic;
