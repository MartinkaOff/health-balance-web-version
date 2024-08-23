import React from "react";
import "./lecures-page.scss";
import CardLecture from "../../Components/Lecture/Card-lecture";
import Header from "../../Components/Header/Header";
import { useAppSelector } from "../../hooks/redux-hooks";
import { IMAGE_URL } from "../../http";
import { Link, useParams } from "react-router-dom";
import { CREATING_LECTURE_ROUTE } from "../../provider/constants-route";
import plug from "../../assets/image/plug.png";
import { dataUserSelector } from "../../Redux/slice/profileSlice";
import { Preloader } from "../../Components/Preloader/Preloader";
import { PullToRefresh } from "../../Components/PullToRefresh/PulltoRefresh";
import { useGetLessonsQuery } from "../../services/lessons.api";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";

export const LecturesPages = () => {
	const params = useParams();
	const dataUser = useAppSelector(dataUserSelector);

	const {
		data: lessons,
		isLoading,
		refetch,
	} = useGetLessonsQuery(Number(params.id));

	const handleRefresh = async () => await refetch();

	return (
		<div className={"lectures-pages"}>
			<PullToRefresh onTrigger={handleRefresh} />
			{/* <Header title={'Лекции и дз'}/> */}
			<HeaderActive />
			{isLoading ? (
				<Preloader height={"auto"} />
			) : (
				<div style={{ position: "relative" }}>
					<div className="lectures-pages__header">
						{/* <div className='lectures-pages__title main-title'>Лекции</div> */}
						<Back content="Лекции" />
						<div className="lectures-pages__wrapper">
							{lessons?.map((lesson) => (
								<CardLecture
									id={lesson.id}
									img={
										lesson.image ? IMAGE_URL + "lessons/" + lesson.image : plug
									}
									title={lesson.title}
									date={new Date(lesson.end_date * 1000).toLocaleDateString()}
									reward={lesson.score}
									key={lesson.id}
									completed={lesson.completed}
								/>
							))}
							{!lessons?.length && (
								<h1 style={{ marginBottom: 20 }}>Лекций нет</h1>
							)}
							{(dataUser.role === 1 || dataUser.role === 2) && (
								<Link
									to={CREATING_LECTURE_ROUTE + "/" + params.id}
									className="_button-yellow"
								>
									Добавить лекции и ДЗ
								</Link>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
