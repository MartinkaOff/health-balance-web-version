import "./lecture-pages.scss";
import Header from "../../Components/Header/Header";
import { LectureTask } from "../../Components/Lecture/Lecture-task";
import { Video } from "../../Components/Lessons/Video";
import { LectureHead } from "../../Components/Lecture/Lecture-head";
import { useParams } from "react-router-dom";
import { Preloader } from "../../Components/Preloader/Preloader";
import { useGetLessonByIdQuery } from "../../services/lessons.api";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";

export const LecturePage = () => {
	const params = useParams();

	const { data: lesson, isLoading } = useGetLessonByIdQuery(Number(params.id));

	if (isLoading) return <Preloader />;

	return (
		<div>
			<HeaderActive />
			<div className={"lecture-page"}>
				<Back content={lesson?.title || "Лекция"} />
				<div className="lecture-page__wrapper">
					{lesson?.video && (
						<div className="lecture-page__video">
							<Video url={lesson?.video || ""} />
						</div>
					)}

					<div className="lecture__task task-lecture">
						<LectureHead
							text={lesson?.description || "Описание"}
							title={"Задание"}
						/>
						<div className="task-lecture__body">
							<LectureTask typeTask={lesson?.type || 1} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
