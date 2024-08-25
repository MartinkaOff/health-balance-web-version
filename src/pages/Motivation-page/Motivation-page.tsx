import "./motivation.scss";
import Header from "../../Components/Header/Header";
import { PostInteresting } from "../../Components/Interesting/Post-interesting";
import { CommentForm } from "../../Components/Comment/Comment-form";
import { ListComments } from "../../Components/Comment/List-comments";
import React from "react";
import { useParams } from "react-router-dom";
import { PullToRefresh } from "../../Components/PullToRefresh/PulltoRefresh";
import {
	useGetListCommentsQuery,
	useGetNewsByIdQuery,
} from "../../services/news.api";
import { Preloader } from "../../Components/Preloader/Preloader";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";
import { HeaderTwo } from "../../Components/Header-two/Header-two";

export const MotivationPage = () => {
	const params = useParams();

	const {
		data: news,
		isLoading,
		refetch: refetchNewsById,
	} = useGetNewsByIdQuery(Number(params.id));
	const { refetch } = useGetListCommentsQuery(Number(params.id));

	const conversionCategory = (category: number) => {
		switch (category) {
			case 1:
				return "Психология";
			case 2:
				return "Инструкция";
			case 3:
				return "Мотивация";
			case 4:
				return "Новость";
			default:
				return "Новость";
		}
	};

	const handleRefresh = async () => {
		await refetchNewsById();
		await refetch();
	};

	return (
		<div>
			<HeaderActive />
			<div className={"motivation-page"}>
				<PullToRefresh onTrigger={handleRefresh} />

				<div>
					<div style={{ margin: "20px 0" }}>
						<HeaderTwo
							title={conversionCategory(news?.category || 0)}
							marginBottom={20}
						/>
					</div>
					<div>
						{isLoading ? (
							<Preloader height={"auto"} />
						) : news ? (
							<div>
								<div className="motivation-page__card">
									<PostInteresting />
								</div>
								<div className="motivation-page__hr" />
								<div className="motivation-page__comments">
									<CommentForm parentId={0} />
									<br />
									<br />
									<ListComments />
								</div>
							</div>
						) : (
							<h1>Новость была удалена или ее не существует!</h1>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
