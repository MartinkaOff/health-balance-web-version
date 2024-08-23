import React, { FC, useEffect } from "react";
import "./tracker.scss";
import moon from "../../assets/image/tracker/akar-icons_moon-fill.png";
import sun from "../../assets/image/tracker/akar-icons_sun-fill.png";
import { useNavigate } from "react-router-dom";
import { GOAL_SLEEP__ROUTE } from "../../provider/constants-route";
import {
	currentDaySelector,
	dataSleepSelector,
	setCurrentDay,
	updateDataSleepTrack,
} from "../../Redux/Tracker/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Preloader } from "../Preloader/Preloader";
import { showToast, sklonenie } from "../../utils/common-functions";
import { HealthySleepItem } from "./Healthy-sleep-item";
import {
	trackerApi,
	useCompleteTrackMutation,
	useGetTrackerQuery,
	useGetTracksQuery,
} from "../../services/tracker.api";
import moment from "moment";
import { errorHandler } from "../../utils/errorsHandler";
import swal from "sweetalert";

interface IHealthySleep {
	editProhibition?: boolean;
	date?: string;
}

export const HealthySleep: FC<IHealthySleep> = ({
	editProhibition,
	date = new Date().toLocaleDateString(),
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const dataSleepTracks = useAppSelector(dataSleepSelector);
	const currentDay = useAppSelector(currentDaySelector);

	const { data: tracks, isLoading } = useGetTracksQuery(date);
	const { data: tracker } = useGetTrackerQuery(undefined);

	const [complete] = useCompleteTrackMutation();

	let hour: number = Number(tracker?.wake_up_time.split(":")[0]);
	let minutes = tracker?.wake_up_time.split(":")[1];
	const morning = tracker?.wake_up_time;
	const evening =
		(+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8).toString().padStart(2, "0") +
		":" +
		minutes;

	const sleepHours =
		currentDay?.sleep_time! >= 8
			? currentDay?.sleep_time +
			  sklonenie(currentDay?.sleep_time!, [" час", " часа", " часов"])
			: "менее 8 часов";

	const redirectToChangeTrack = () => {
		swal({
			title:
				"Вы уверены что хотите изменить цель?  Будет создан новый трекер и старые выполненные цели будут аннулированы!",
			buttons: ["Отменить", "Выполнить"],
		}).then((value) => {
			if (value) navigate(GOAL_SLEEP__ROUTE);
		});
	};

	const completeTracks = async (id: number, prevId: number) => {
		const promisePrevTrack = complete(prevId);
		const promiseTrack = complete(id);
		Promise.all([promisePrevTrack, promiseTrack])
			.then(function () {
				showToast("Цель выполнена");
			})
			.catch((e) => errorHandler(e));
	};

	const completeTrackSleep = async (index: number) => {
		if (dataSleepTracks[index].sleep_time! >= 8) return;

		const prevItemTrackSleep = dataSleepTracks[index - 1];

		const itemTrackSleep = dataSleepTracks[index];

		if (prevItemTrackSleep?.id < 0 || itemTrackSleep?.id < 0) return;

		swal({
			title: `Выполнить цель "здоровый сон"?`,
			buttons: ["Отменить", "Выполнить"],
		}).then(async (value) => {
			if (!value) return;
			if (index === 0) {
				const lastSunday = new Date(
					(itemTrackSleep.send_time - 24 * 60 * 60) * 1000
				);
				const prevTracksSleep = dispatch(
					trackerApi.endpoints.getTracks.initiate(
						moment(lastSunday).format("DD.MM.YYYY")
					)
				);
				prevTracksSleep.unwrap().then(async (e) => {
					const dataEveningSunday = e.sleepTrack.find(
						(item) => item.type === 4 && item.additional === "вс"
					);
					if (dataEveningSunday && dataEveningSunday?.id !== 0)
						await completeTracks(itemTrackSleep.id, dataEveningSunday?.id);
				});
				prevTracksSleep.unsubscribe();
				return;
			}

			try {
				await completeTracks(itemTrackSleep?.id, prevItemTrackSleep.id);
			} catch (error) {
				await showToast("Ошибка");
			}
		});
	};

	useEffect(() => {
		if (tracks) {
			dispatch(updateDataSleepTrack(tracks));
			dispatch(setCurrentDay({ date: date, tracks }));
		}
	}, [tracks]);

	if (isLoading) {
		return <Preloader height="auto" />;
	}

	return (
		<div className={"healthy-sleep"}>
			<div className="healthy-sleep__head">
				<div className="healthy-sleep__title title-17">Здоровый сон</div>
				{!editProhibition && (
					<div
						className="healthy-sleep__link text-blue"
						onClick={redirectToChangeTrack}
					>
						изменить цель
					</div>
				)}
			</div>
			<div className="healthy-sleep__body">
				<div className="healthy-sleep__row">
					<div className="healthy-sleep__icon">
						<img src={moon} alt="moon" />
						<div className="healthy-sleep__time">{evening}</div>
					</div>
					<div className="healthy-sleep__border-dashed" />
					<div className="healthy-sleep__text">
						Вы спали{" "}
						<span
							style={{
								color: currentDay?.sleep_time! >= 8 ? "#00A62E" : "#F4C119",
							}}
						>
							{sleepHours}
						</span>
					</div>
					<div className="healthy-sleep__border-dashed" />
					<div className="healthy-sleep__icon">
						<img src={sun} alt="sun" />
						<div className="healthy-sleep__time">{morning}</div>
					</div>
				</div>
				<div className="healthy-sleep__days">
					{tracks?.sleepTrack.length ? (
						dataSleepTracks.map((item, index, array) => {
							if (item.type === 1) {
								return (
									<HealthySleepItem
										isTrackExist={
											!(array[index]?.id < 0 || array[index - 1]?.id < 0)
										}
										completeTrackSleep={completeTrackSleep}
										index={index}
										item={item}
										key={index}
									/>
								);
							}
							return;
						})
					) : (
						<h1>Данных нет</h1>
					)}
				</div>
			</div>
		</div>
	);
};
