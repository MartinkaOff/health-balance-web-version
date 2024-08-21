import React, { useEffect } from "react";
import "./access-recovery.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
	emailRecoverySelector,
	errorRecoverySelector,
	setDisabledButton,
	setError,
	setRecoveryEmail,
} from "../../Redux/slice/accessRecoverySlice";

export const RecoveryEmail = () => {
	const error = useAppSelector(errorRecoverySelector);
	const email = useAppSelector(emailRecoverySelector);
	const dispatch = useAppDispatch();
	const validRegex =
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

	const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setError(""));
		dispatch(setRecoveryEmail(e.target.value.trim()));
		dispatch(setDisabledButton(!e.target.value.match(validRegex)));
	};

	useEffect(() => {
		dispatch(setDisabledButton(!email.match(validRegex)));
	}, []);

	return (
		<div className={"recovery-email"}>
			<div className="recovery-email__title main-title">Укажите вашу почту</div>
			<input
				type="text"
				className={
					error ? "recovery-email__field error" : "recovery-email__field"
				}
				value={email}
				onChange={handlerEmail}
			/>
			{error && <div className="recovery-email__error">{error}</div>}
		</div>
	);
};
