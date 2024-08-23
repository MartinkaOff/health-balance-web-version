import "./dynamics-page.scss";
import { CardIndex } from "../../Components/Health-index-result/Card-index";
import Header from "../../Components/Header/Header";
import { useAppSelector } from "../../hooks/redux-hooks";
import {
	currentResultIndexSelector,
	indicatorsSelector,
} from "../../Redux/slice/healthIndexSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { KeysDynamics } from "../../models/IHealthIndex";
import { useGetDynamicsQuery } from "../../services/healthIndex.api";
import React from "react";
import { Preloader } from "../../Components/Preloader/Preloader";
import { ChartIndex } from "../../Components/Health-index-result/Chart-index";
import { monthsABBR } from "../../utils/globalConstants";
import { getGradient } from "../../Components/Charts/Chart-options";
import { Back } from "../../Components/Back/Back";
import HeaderActive from "../../Components/Header-active/Header-active";

export const DynamicsPage = () => {
	const { data: dynamics, isLoading } = useGetDynamicsQuery(null);
	const currentResultIndex = useAppSelector(currentResultIndexSelector);
	const indicators = useAppSelector(indicatorsSelector);
	let titlesIndex =
		currentResultIndex &&
		Object.keys(currentResultIndex).filter(
			(item) => item !== "id" && item !== "date" && item !== "poll_id"
		);

	const displayGraph = (param: KeysDynamics) => {
		const labelMonths =
			dynamics &&
			dynamics.map((item) => monthsABBR[new Date(item.date * 1000).getMonth()]);
		return {
			labels: labelMonths,
			datasets: [
				{
					data: dynamics && dynamics.map((item) => item[param]),
					//backgroundColor: '#F2994A',
					backgroundColor: function (context: any) {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						if (!chartArea) return null;

						return getGradient(ctx, chartArea, "#00A62E", "#3CF470");
					},
					borderRadius: 5,
				},
			],
		};
	};

	return (
		<div>
			<HeaderActive />
			<div className={"dynamics-page"}>
				<Back content={"Динамика"} />
				{isLoading ? (
					<Preloader height={"auto"} />
				) : (
					<>
						<div className="dynamics-page__title title-17">
							Показатели вне нормы
						</div>
						<div className="dynamics-page__index">
							{indicators.map((item: any, index: any) => {
								const condition =
									item.tag !== "body_mass_index"
										? item.value === item.averageValue ||
										  item.value === item.criticalValue
										: item.value > item.criticalValue ||
										  item.value < item.averageValue;
								if (condition) {
									return (
										<div className="dynamics-page__index-item" key={index}>
											<CardIndex
												title={item.title}
												value={item.value}
												tag={item.tag}
											/>
										</div>
									);
								}
								return;
							})}
						</div>
						<div className="dynamics-page__main-title main-title">Динамика</div>
						{/* <Swiper
              spaceBetween={150}
              slidesPerView={1.1}
              pagination={{
                clickable: true,
                bulletClass: 'dynamic-bullet',
                bulletActiveClass: 'dynamic-bullet_active',
                modifierClass: 'mod'
              }}
              modules={[Pagination]}
            >
              {titlesIndex?.map((item, i) => (
                <SwiperSlide key={i}>
                  <ChartIndex
                    itemIndex={item as KeysDynamics}
                    displayGraph={displayGraph}
                  />
                </SwiperSlide>
              ))}
            </Swiper> */}
						{window.innerWidth > 768 ? (
							<div className="dynamics-page__wrapper">
								{titlesIndex?.map((item, i) => (
									<ChartIndex
										itemIndex={item as KeysDynamics}
										displayGraph={displayGraph}
									/>
								))}
							</div>
						) : (
							<Swiper
								spaceBetween={50}
								slidesPerView={window.innerWidth > 500 ? 2 : 1}
								pagination={{
									clickable: true,
									bulletClass: "dynamic-bullet",
									bulletActiveClass: "dynamic-bullet_active",
									modifierClass: "mod",
								}}
								modules={[Pagination]}
							>
								{titlesIndex?.map((item, i) => (
									<SwiperSlide key={i}>
										<ChartIndex
											itemIndex={item as KeysDynamics}
											displayGraph={displayGraph}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</>
				)}
			</div>
		</div>
	);
};
