import { NavigationComponent } from "../../Components/Navigation/Navigation-component";
import { WaterTarget } from "../../Components/Tracker/Water-target";
import { FruitTarget } from "../../Components/Tracker/Fruit-target";
import "./tracker-habits_page.scss";
import icon_fruit from "../../assets/image/tracker/icon-fruit.svg";
import icon_water from "../../assets/image/tracker/icon-water.svg";
import { NavLink, useNavigate } from "react-router-dom";
import {
	ACTIVITY_ROUTE,
	GOAL_FRUITS__ROUTE,
	GOAL_WATER__ROUTE,
	STATISTICS_TRACKER__ROUTE,
} from "../../provider/constants-route";
import { HeaderTwo } from "../../Components/Header-two/Header-two";
import { showToast, sklonenie } from "../../utils/common-functions";
import {
	useDeleteTrackerMutation,
	useGetTrackerQuery,
	useGetTracksQuery,
} from "../../services/tracker.api";
import { HealthySleep } from "../../Components/Tracker/Healthy-sleep";
import React from "react";
import { PullToRefresh } from "../../Components/PullToRefresh/PulltoRefresh";
import { api } from "../../services/api";
import swal from "sweetalert";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";

export const TrackerHabitsPage = () => {
	const { data: tracker } = useGetTrackerQuery();
	const [getUserTime] = api.endpoints.getUserTime.useLazyQuery();
	const { refetch } = useGetTracksQuery(new Date().toLocaleDateString(), {
		refetchOnMountOrArgChange: true,
	});

	const countWater = tracker && ((tracker.weight * 35) / 1000).toFixed(1);
	const [deleteTrackers, { isLoading }] = useDeleteTrackerMutation();
	const navigate = useNavigate();

	const deleteTracker = async () => {
		try {
			const response = await deleteTrackers(null).unwrap();
			if (response?.success) {
				await showToast("Трекер успешно удален");
				navigate(ACTIVITY_ROUTE);
			}
		} catch (error) {
			await showToast("Произошла ошибка");
		}
	};

	const redirectToChangeTrack = (path: string) => {
		swal({
			title:
				"Вы уверены что хотите изменить цель?  Будет создан новый трекер и старые выполненные цели будут аннулированы!",
			buttons: ["Отменить", "Выполнить"],
		}).then((value) => {
			if (value) navigate(path);
		});
	};

	const handleRefresh = async () => {
		refetch();
		getUserTime(null);
	};

	return (
		<div className={"tracker-habits-page"}>
			<PullToRefresh onTrigger={handleRefresh} />
			<HeaderActive />
			<NavigationComponent />
			<div className="tracker-habits-page-wrapper">
				<HeaderTwo title={"Трекер привычек"} marginBottom={20} />
				<>
					<div className="tracker-habits-page__target">
						<HealthySleep />
					</div>

					<div className="tracker-habits-page__task-title">
						<div className="tracker-habits-page__task-column">
							<img src={icon_water} alt="icon_water" />
							<span>{countWater} л.</span>
							воды сегодня
						</div>
						<div className="tracker-habits-page__task-column">
							<div
								onClick={() => redirectToChangeTrack(GOAL_WATER__ROUTE)}
								className="text-blue"
							>
								изменить цель
							</div>
						</div>
					</div>
					<div className="tracker-habits-page__target">
						<WaterTarget />
					</div>
					<div className="tracker-habits-page__task-title">
						<div className="tracker-habits-page__task-column">
							<img src={icon_fruit} alt="" />
							Съесть <span>{tracker?.fruits}</span>{" "}
							{tracker &&
								sklonenie(tracker?.fruits, ["фрукт", "фрукта", "фруктов"])}{" "}
							/{" "}
							{tracker &&
								sklonenie(tracker?.fruits, ["овощ", "овоща", "овощей"])}
						</div>
						<div className="tracker-habits-page__task-column">
							<div
								onClick={() => redirectToChangeTrack(GOAL_FRUITS__ROUTE)}
								className="text-blue"
							>
								изменить цель
							</div>
						</div>
					</div>
					<div className="tracker-habits-page__target">
						<FruitTarget />
					</div>
					<div className="tracker-habits-page__statistical-btn-wrapper">
						<NavLink
							to={STATISTICS_TRACKER__ROUTE}
							style={{ color: "#fff" }}
							className="_button-dark"
						>
							Смотреть статистику
						</NavLink>
					</div>
					<div className="tracker-habits-page__statistical-btn-wrapper">
						<button
							style={{ color: "#fff" }}
							disabled={isLoading}
							onClick={deleteTracker}
							className="_button-dark"
						>
							{isLoading ? (
								<span className="spinner">
									<i className="fa fa-spinner fa-spin"></i> Загрузка
								</span>
							) : (
								"Отключить трекер"
							)}
						</button>
					</div>
				</>
			</div>
		</div>
	);
};
