import React, { useState } from "react";
import "./Consultation-page.scss";
import Header from "../../Components/Header/Header";
import {
	Path,
	useForm,
	UseFormRegister,
	SubmitHandler,
	Controller,
} from "react-hook-form";
import { formatConsultation } from "../../utils/enums";
import InputMask from "react-input-mask";
import { ModalSuccess } from "../../Components/Modals/Modal-success";
import { ACTIVITY_ROUTE, PROFILE_ROUTE } from "../../provider/constants-route";
import { IConsultation } from "../../models/IConsultation";
import { useConsultationMutation } from "../../services/consultation.api";
import { showToast } from "../../utils/common-functions";
import { Back } from "../../Components/Back/Back";
import HeaderActive from "../../Components/Header-active/Header-active";

export const ConsultationPage = () => {
	const id = Number(localStorage.getItem("id"));

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm<IConsultation>({
		mode: "onChange",
	});

	const [submitConsultation, { isLoading, isSuccess }] =
		useConsultationMutation();

	const onSubmit: SubmitHandler<IConsultation> = async ({
		city,
		comment,
		name,
		phone,
		type,
	}) => {
		await submitConsultation({
			id,
			city,
			comment,
			name,
			phone,
			type,
		})
			.unwrap()
			.catch(async (err) => {
				await showToast("Произошла непредвиденная ошибка");
			});
	};

	if (isSuccess) {
		return (
			<ModalSuccess
				title="Заявка принята"
				showReward={false}
				route={ACTIVITY_ROUTE}
			/>
		);
	}

	return (
		<div>
			<HeaderActive />
			<div className="consultation-page">
				<Back content="Запись к специалисту" />
				<div className="consultation-page__container">
					<div className="consultation-page__title main-title">
						Заявка на консультацию
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="consultation-page__form form-consultation"
					>
						<div className="form-consultation__row">
							<div className="form-consultation__sub-text">Имя</div>
							<input
								{...register("name", { required: true, maxLength: 30 })}
								className="form-consultation__input _field"
							/>
							{errors.name?.type === "required" && (
								<p role="alert" className="form-consultation__error">
									Данное поле не может быть пустым
								</p>
							)}
						</div>
						<div className="form-consultation__row">
							<div className="form-consultation__sub-text">Телефон</div>
							<Controller
								control={control}
								name="phone"
								rules={{
									required: true,
									pattern: /^([+]?[0-9\s-\(\)]{3,25})*$/i,
								}}
								defaultValue={""}
								render={({ field }) => (
									<InputMask
										className="form-consultation__input _field"
										{...field}
										mask="+7 (999) 999-99-99"
										placeholder="+7 (---) --------"
									/>
								)}
							/>
							{errors.phone?.type === "required" && (
								<p role="alert" className="form-consultation__error">
									Данное поле не может быть пустым
								</p>
							)}
						</div>
						<div className="form-consultation__row">
							<div className="form-consultation__sub-text">Город</div>
							<input
								{...register("city", { required: true })}
								className="form-consultation__input _field"
							/>
							{errors.city?.type === "required" && (
								<p role="alert" className="form-consultation__error">
									Данное поле не может быть пустым
								</p>
							)}
						</div>
						<div className="form-consultation__row">
							<div className="form-consultation__sub-text">
								Выберите формат встречи
							</div>
							<div className="_custom-select">
								<select {...register("type", { required: true })}>
									<option value="Видео">Видео</option>
									<option value="Телефон">Телефон</option>
									<option value="Чат">Чат</option>
								</select>
							</div>
							{errors.type?.type === "required" && (
								<p role="alert" className="form-consultation__error">
									Данное поле не может быть пустым
								</p>
							)}
						</div>
						<div className="form-consultation__row">
							<div className="form-consultation__sub-text">
								Какой запрос у вас/проблема для решения
							</div>
							<input
								{...register("comment", { required: true })}
								className="form-consultation__input _field"
							/>
							{errors.comment?.type === "required" && (
								<p role="alert" className="form-consultation__error">
									Данное поле не может быть пустым
								</p>
							)}
						</div>
						<button
							type="submit"
							className={
								"form-consultation__submit _button-white" +
								(!isValid ? " disabled" : "")
							}
							disabled={!isValid || isLoading}
						>
							{isLoading ? (
								<span className="spinner">
									<i className="fa fa-spinner fa-spin"></i> Загрузка
								</span>
							) : (
								"Далее"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
