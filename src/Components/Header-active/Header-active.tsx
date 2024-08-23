import { FC, useEffect } from "react";
import "./header-active.scss";
import { RewardCount } from "../Reward/Reward-count";
import icon_chat from "../../assets/image/icon_chat.svg";
import { Link } from "react-router-dom";
import { CHAT__ROUTE, PROFILE_ROUTE } from "../../provider/constants-route";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { dataUserSelector } from "../../Redux/slice/profileSlice";
import { IMAGE_URL } from "../../http";
import {
	balanceSelector,
	getBalance,
	heightStatusBarSelector,
} from "../../Redux/slice/appSlice";
import avatar from "../../assets/image/avatar.jpeg";
import { Capacitor } from "@capacitor/core";
import logo from "../../assets/image/Logo-noText.svg";
import { useLocation } from "react-router-dom";

// interface IHeaderActive {
//   transparent: boolean
// }

const HeaderActive = () => {
	const dataUser = useAppSelector(dataUserSelector);
	const balance = useAppSelector(balanceSelector);
	const statusBar = useAppSelector(heightStatusBarSelector);
	const dispatch = useAppDispatch();

	const pathname = useLocation().pathname;

	useEffect(() => {
		dispatch(getBalance());
	}, []);

	const back = () => {
		window.history.back();
	};

	return (
		<div
			className={"header-active"}
			style={{
				// background: '#121212',
				top: Capacitor.getPlatform() === "ios" ? 0 : "auto",
				padding:
					Capacitor.getPlatform() === "ios"
						? `${+statusBar}px 16px 16px 16px`
						: "16px 16px 16px 16px",
			}}
		>
			<div className="header-active__container">
				<div className="header-active__logo">
					<img src={logo} alt="logo" />
					HEALTH BALANCE
				</div>
				<div className="header-active__wrapper">
					{pathname !== "/" ? (
						<div>
							<div
								className="header__back icon-icon_back"
								onClick={back}
								style={{
									top: "50%",
									transform: "translateY(-50%)",
								}}
							/>
						</div>
					) : undefined}
					<Link to={PROFILE_ROUTE} className="header-active__column">
						<div className="header-active__avatar">
							{dataUser.avatar && (
								<img
									src={IMAGE_URL + "avatars/" + dataUser.avatar}
									alt="avatar"
								/>
							)}
							{!dataUser.avatar && <img src={avatar} alt="avatar" />}
						</div>
						<div className="header-active__user-name icon-icon_back">
							{dataUser.name}
						</div>
					</Link>
					<div className="header-active__column header-active__column-links">
						{/* {transparent ? (
              <RewardCount count={balance} />
            ) : (
              <Link to={CHAT__ROUTE}>
                <img src={icon_chat} alt='' />
              </Link>
            )} */}
						<RewardCount count={balance} />
						<Link to={CHAT__ROUTE}>
							<img src={icon_chat} alt="" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderActive;
