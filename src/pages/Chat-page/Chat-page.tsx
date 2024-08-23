import { ListDialog } from "../../Components/Chat/List-dialogs";
import Header from "../../Components/Header/Header";
import "./chat-page.scss";
import { Back } from "../../Components/Back/Back";
import HeaderActive from "../../Components/Header-active/Header-active";

export const ChatPage = () => {
	return (
		<div>
			{window.innerWidth > 500 ? <HeaderActive /> : ""}
			<div className="chat">
				<Back content="Чат" />
				<ListDialog />
			</div>
		</div>
	);
};
