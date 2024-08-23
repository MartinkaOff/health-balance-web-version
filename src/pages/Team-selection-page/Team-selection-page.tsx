import "./team-selection-page.scss";
import { TeamSelection } from "../../Components/Team-selection/Team-selection";
import Header from "../../Components/Header/Header";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";

export const TeamSelectionPage = () => {
	return (
		<div>
			{window.innerWidth > 500 ? <HeaderActive /> : ""}
			<div className={"team-selection-page"}>
				<Back content={"Выбор команды"} />
				<div className="team-selection-page__title main-title">
					Вступите в команду
				</div>
				<div className="team-selection-page__sub-title">
					Информацию о команде уточняйте у куратора
				</div>
				<div className="team-selection-page__team">
					<TeamSelection />
				</div>
			</div>
		</div>
	);
};
