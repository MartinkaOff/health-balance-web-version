import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import paperclip from "../../assets/image/chat/icon_paperclip.svg";
import Header from "../../Components/Header/Header";
import { IMAGE_URL } from "../../http";
import { IAllMessages } from "../../models/IChat";
import ChatService from "../../services/ChatService";
import "./chat-page.scss";
import avatar from "../../assets/image/avatar.jpeg";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";

export const PersonalChat = () => {
	const id = Number(localStorage.getItem("id"));

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<IAllMessages[]>([]);
	const params = useParams();
	const idChannel = Number(params.id);

	const sendMessage = async () => {
		if (message.trim()) {
			await ChatService.sendMessage(message, idChannel);
			const allMessages = await ChatService.listMessages(idChannel);
			setMessages(allMessages.data.data);
			//setMessages(prev=>[...prev,response.data.data])
			setMessage("");
		}
	};

	useEffect(() => {
		(async () => {
			const allMessages = await ChatService.listMessages(idChannel);
			setMessages(allMessages.data.data);
		})();

		let interval = setInterval(async () => {
			const allMessages = await ChatService.listMessages(idChannel);
			setMessages(allMessages.data.data);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<HeaderActive />
			<div className="personal-chat">
				<Back content={"Диалог #" + idChannel} />
				<div className="personal-chat__container">
					<div className="personal-chat__messages">
						{messages?.map((mess, i) => (
							<div
								className="personal-chat__message message-item"
								key={i}
								style={{ marginLeft: id === mess?.author?.id ? "auto" : 0 }}
								id={"qw" + i}
							>
								{id !== mess?.author?.id && (
									<div className="message-item__avatar">
										{" "}
										<img
											src={
												mess?.author?.avatar
													? IMAGE_URL + "avatars/" + mess?.author?.avatar
													: avatar
											}
											alt=""
											width={20}
										/>
									</div>
								)}

								<div className="message-item__container">
									{id !== mess?.author?.id && (
										<div className="message-item__name text-blue">
											{mess?.author?.name}
										</div>
									)}
									<div className="message-item__text">{mess?.content}</div>
									<div className="message-item__time">
										{mess?.createdAt?.date.slice(10, -10)}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="personal-chat__send">
						<button className="personal-chat__paperclip">
							<img src={paperclip} alt="paperclip" />
						</button>
						<input
							type="text"
							className="personal-chat__input"
							placeholder="Сообщение"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setMessage(e.target.value)
							}
							value={message}
						/>
						<button
							className="personal-chat__submit icon-icon_send"
							onClick={sendMessage}
						></button>
					</div>
				</div>
				<div className="line" style={{ position: "fixed" }}></div>
			</div>
		</div>
	);
};
