import React, { useEffect, useState } from "react";
import "./questionnaire.scss";
import Header from "../../Components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
	addIndexPageAnswer,
	answersQuestionnaireSelector,
	idPolleSelector,
	progressPollSelector,
	resetAnswers,
	resetQuestionnaire,
} from "../../Redux/slice/healthIndexSlice";
import { ProgressBar } from "../../Components/Progress-bar/Progress-bar";
import { typesChallenge } from "../../utils/enums";
import { HEALTH_INDEX_ROUTE } from "../../provider/constants-route";
import TextQuiz from "../../Components/Quiz/TextQuiz";
import RadioQuiz from "../../Components/Quiz/RadioQuiz";
import CheckboxQuiz from "../../Components/Quiz/CheckboxQuiz";
import { CheckboxWithAnswer } from "../../Components/Quiz/CheckboxWithAnswer";
import { NumberQuiz } from "../../Components/Quiz/NumberQuiz";
import { DateQuiz } from "../../Components/Quiz/DateQuiz";
import { RadioWithAnswer } from "../../Components/Quiz/RadioWithAnswer";
import { ModalStatus } from "../../Components/Modals/Modal-status";
import { Preloader } from "../../Components/Preloader/Preloader";
import {
	useGenerateResultsPollMutation,
	useGetQuestionnaireQuery,
	useSaveCurrentResultMutation,
} from "../../services/healthIndex.api";
import { showToast } from "../../utils/common-functions";
import { ISaveCurrentResult } from "../../models/IHealthIndex";
import { dataUserSelector } from "../../Redux/slice/profileSlice";
import { Back } from "../../Components/Back/Back";
import HeaderActive from "../../Components/Header-active/Header-active";
import { HeaderTwo } from "../../Components/Header-two/Header-two";

export const Questionnaire = () => {
	const dispatch = useAppDispatch();
	const profile = useAppSelector(dataUserSelector);
	const { data: questionnaire } = useGetQuestionnaireQuery(profile.gender);
	const [generatePollResults, { isLoading }] = useGenerateResultsPollMutation();
	const [saveCurrentPollResults, { isLoading: isLoadingSaveCurrent }] =
		useSaveCurrentResultMutation();
	const answers = useAppSelector(answersQuestionnaireSelector);
	const idPoll = useAppSelector(idPolleSelector);
	const progressPoll = useAppSelector(progressPollSelector);
	const [indexQuestion, setIndexQuestion] = useState(0);
	const [finished, setFinished] = useState<boolean>(false);

	const generateResult = async () => {
		try {
			const response = await generatePollResults(idPoll).unwrap();
			if (response.success) {
				dispatch(resetQuestionnaire());
				setFinished(true);
			}
		} catch (e) {
			await showToast("Ошибка");
		}
	};

	const saveCurrentResult = async () => {
		const answersJSON = JSON.stringify(Object.assign({}, ...answers));
		const data: ISaveCurrentResult = {
			id: idPoll,
			answers: answersJSON,
		};
		await saveCurrentPollResults(data)
			.unwrap()
			.catch((e) => showToast(e.data));
	};

	useEffect(() => {
		dispatch(resetAnswers());
	}, []);

	useEffect(() => {
		if (questionnaire) {
			if (questionnaire[progressPoll]?.questions.length === indexQuestion) {
				saveCurrentResult();
				dispatch(resetAnswers());
				if (progressPoll !== 9) {
					setIndexQuestion(0);
				}
				if (progressPoll === 9) {
					generateResult();
					return;
				}
			}

			//Проверка ответов на диабет
			if (
				questionnaire[progressPoll]?.questions[indexQuestion - 1]?.tag ===
					"family_illness" &&
				indexQuestion === 2 &&
				!answers[1][
					questionnaire[progressPoll]?.questions[indexQuestion - 1].id
				].includes(3)
			) {
				dispatch(
					addIndexPageAnswer({
						[questionnaire[progressPoll]?.questions[indexQuestion - 1].id +
						1]: 1,
					})
				);
				setIndexQuestion((prev) => prev + 1);
			}
			//Проверка ответов на курение
			if (
				questionnaire[progressPoll]?.questions[indexQuestion - 1]?.tag ===
					"smoking_type" &&
				indexQuestion === 1 &&
				(answers[0][
					questionnaire[progressPoll]?.questions[indexQuestion - 1].id
				] === 8 ||
					answers[0][
						questionnaire[progressPoll]?.questions[indexQuestion - 1].id
					] === 9)
			) {
				dispatch(
					addIndexPageAnswer({
						[questionnaire[progressPoll]?.questions[indexQuestion - 1].id +
						1]: 0,
					})
				);
				dispatch(
					addIndexPageAnswer({
						[questionnaire[progressPoll]?.questions[indexQuestion - 1].id +
						2]: 0,
					})
				);
				setIndexQuestion((prev) => prev + 2);
			}
			//проверка ответов на алкоголь
			if (
				questionnaire[progressPoll]?.questions[indexQuestion - 1]?.tag ===
					"alcohol_use" &&
				indexQuestion === 1 &&
				answers[0][
					questionnaire[progressPoll]?.questions[indexQuestion - 1].id
				] === 1
			) {
				dispatch(
					addIndexPageAnswer({
						[questionnaire[progressPoll]?.questions[indexQuestion - 1].id +
						1]: 1,
					})
				);
				dispatch(
					addIndexPageAnswer({
						[questionnaire[progressPoll]?.questions[indexQuestion - 1].id +
						2]: 1,
					})
				);
				setIndexQuestion((prev) => prev + 2);
			}
		}
	}, [indexQuestion]);

	const answerHandler = (answer: any) => {
		dispatch(addIndexPageAnswer(answer));
		setIndexQuestion((prev) => prev + 1);
	};

	if (isLoading || isLoadingSaveCurrent) {
		return <Preloader />;
	}

	if (finished) {
		return (
			<ModalStatus
				route={HEALTH_INDEX_ROUTE}
				subTitle={"Нажмите ОК для просмотра результатов"}
			/>
		);
	}

	if (!questionnaire) {
		return null;
	}

	return (
		<div>
			<HeaderActive />
			<div className="questionnaire-page">
				{
					<div>
						{questionnaire.length ? (
							<div>
								<HeaderTwo
									title={"Анкета #" + (progressPoll + 1)}
									marginBottom={20}
								/>
								<div className="questionnaire-page__progress-bar">
									<div className="questionnaire-page__progress-value">
										{answers.length + 1} /{" "}
										{questionnaire[progressPoll]?.questions.length}
										<span>{questionnaire[progressPoll]?.name}</span>
									</div>
									<ProgressBar
										percent={
											((answers.length + 1) * 100) /
											questionnaire[progressPoll]?.questions.length
										}
										type={typesChallenge.common}
									/>
								</div>
								<div className="questionnaire-page__question">
									<div>
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 1 && (
											<RadioQuiz
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
												answerHandler={answerHandler}
												answers={
													questionnaire[progressPoll].questions[indexQuestion]
														.answers
												}
												id={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.id
												}
											/>
										)}
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 2 && (
											<TextQuiz
												answerHandler={answerHandler}
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
											/>
										)}
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 3 && (
											<NumberQuiz
												answerHandler={answerHandler}
												id={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.id
												}
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
											/>
										)}
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 4 && (
											<CheckboxQuiz
												id={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.id
												}
												answers={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.answers
												}
												answerHandler={answerHandler}
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
											/>
										)}
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 5 && (
											<DateQuiz
												answerHandler={answerHandler}
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
											/>
										)}
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 6 && (
											<RadioWithAnswer
												id={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.id
												}
												answers={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.answers
												}
												answerHandler={answerHandler}
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
											/>
										)}
										{questionnaire[progressPoll]?.questions[indexQuestion]
											?.answer_type === 7 && (
											<CheckboxWithAnswer
												id={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.id
												}
												answers={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.answers
												}
												answerHandler={answerHandler}
												question={
													questionnaire[progressPoll]?.questions[indexQuestion]
														?.question
												}
											/>
										)}
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
				}
			</div>
		</div>
	);
};
