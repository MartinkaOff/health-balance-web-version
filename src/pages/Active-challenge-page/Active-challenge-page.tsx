import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import { HeaderChallenge } from "../../Components/Challenge/Header-challenge";
import { ListLeadersChallenge } from "../../Components/List-leaders-challenge/List-leaders-challenge";
import "./active-challenge-page.scss";
import { TaskChallenge } from "../../Components/Challenge/Task-challenge";
import { ProgressBar } from "../../Components/Progress-bar/Progress-bar";
import { RewardCount } from "../../Components/Reward/Reward-count";
import { Link, useParams } from "react-router-dom";
import { LECTURES_ROUTE } from "../../provider/constants-route";
import icon_clock from "../../assets/image/Interesting/clock.svg";
import { definitionColor } from "../../utils/common-functions";
import { useGetChallengeByIdQuery } from "../../services/ChallengeService";
import { Preloader } from "../../Components/Preloader/Preloader";
import { PullToRefresh } from "../../Components/PullToRefresh/PulltoRefresh";
import { leaderboardApi } from "../../services/leaderboard.api";
import {
	calculatingPercentage,
	itemsChallengeTask,
} from "../../Redux/slice/challengeSlice";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";
import { HeaderChallengeIcon } from "../../Components/Challenge/Header-challenge-icon";

export const ActiveChallengePage = () => {
	const params = useParams();
	const {
		data: challenge,
		isLoading: getChallengeLoading,
		refetch,
	} = useGetChallengeByIdQuery(Number(params.id));
	const [leaderboard] =
		leaderboardApi.endpoints.leaderboardChallenge.useLazyQuery();
	const [leaderboardTeams] =
		leaderboardApi.endpoints.leaderboardTeams.useLazyQuery();
	const [transparentHeader, setTransparentHeader] = useState<boolean>(true);
	const idChallenge: any = useRef(null);

	const percent = challenge ? calculatingPercentage(challenge) : 0;

	const itemsTask = challenge ? itemsChallengeTask(challenge) : [];

	useEffect(() => {
		window.addEventListener("scroll", function () {
			let scroll = window.pageYOffset;
			if (scroll >= 230) setTransparentHeader(false);
			else setTransparentHeader(true);
		});
		idChallenge.current = challenge?.id;
	}, [challenge]);

	async function handleRefresh() {
		if (idChallenge.current) {
			await leaderboard(idChallenge.current);
			await leaderboardTeams(idChallenge.current);
			refetch();
		}
	}

	return (
		<div className={"active-challenge-page"}>
			<HeaderActive />
			<PullToRefresh onTrigger={handleRefresh} />
			{/* <Header
                title={'Челлендж'}
                customClass={transparentHeader ? 'active-challenge-page__header' : ''}
            /> */}

			{getChallengeLoading ? (
				<Preloader height={"auto"} />
			) : (
				<>
					<div className="active-challenge-page__main">
						<Back content="Челлендж" />
						<div className="active-challenge-page__wrapper">
							<div>
								<HeaderChallengeIcon image={challenge?.image || ""} />
								<div className="tasks-active-challenge__head">
									<div className="tasks-active-challenge__title-17 title-17">
										Челлендж закончится:
									</div>
									<div className="tasks-active-challenge__data">
										<img src={icon_clock} alt="" />
										{challenge?.end_date &&
											new Date(challenge?.end_date * 1000).toLocaleDateString()}
									</div>
								</div>
							</div>
							<div className="active-challenge-page__wrapper-content">
								<HeaderChallenge
									type={challenge?.type || 1}
									image={challenge?.image || ""}
									title={challenge?.title || ""}
									newChallengeCategory
								/>
								<div className="active-challenge-page__tasks tasks-active-challenge">
									<TaskChallenge
										type={challenge?.type || 1}
										tasks={itemsTask}
									/>
								</div>
								<Link
									to={LECTURES_ROUTE + "/" + params.id}
									className="active-challenge-page__button _button-yellow"
								>
									Лекции и домашнее задание
								</Link>
								{challenge?.purpose && (
									<div className="active-challenge-page__progress">
										<div
											className={
												definitionColor(
													challenge?.type || 1,
													"active-challenge-page__title-17"
												) + " title-17"
											}
										>
											Общий прогресс <span>{percent?.toFixed(1) || 100}%</span>{" "}
											/ 100%
										</div>
										<ProgressBar
											percent={percent || 0}
											type={challenge?.type || 1}
										/>
									</div>
								)}
								<div className="active-challenge-page__title-block block-title">
									Лидеры челленджа
								</div>
								{challenge?.type && (
									<ListLeadersChallenge
										type={challenge?.type}
										idChallenge={challenge?.id}
									/>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
