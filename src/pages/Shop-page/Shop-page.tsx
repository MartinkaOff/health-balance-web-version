import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { ShopCards } from "../../Components/Shop/Shop-cards";
import "./shop-page.scss";
import { TabContent, Tabs } from "../../Components/Tabs/Tabs";
import { ShopHead } from "../../Components/Shop/Shop-head";
import { useGetCategoriesQuery } from "../../services/shop.api";
import { Preloader } from "../../Components/Preloader/Preloader";
import { Back } from "../../Components/Back/Back";
import HeaderActive from "../../Components/Header-active/Header-active";

export const ShopPage = () => {
	const [valueTab, setValueTab] = useState<number>(0);

	const { data: category, isLoading } = useGetCategoriesQuery(null);

	return (
		<div>
			{window.innerWidth > 500 ? <HeaderActive /> : ""}
			<div className={"shop-page"}>
				<Back content={"Награда"} />
				<ShopHead marginBottom={42} />
				{isLoading ? (
					<Preloader height={"auto"} />
				) : category?.length ? (
					<>
						<Tabs
							labels={category.map((item) => item.name)}
							onClick={setValueTab}
							value={valueTab}
							customClassChildren={"shop-page__tabs-labels"}
							customClassParent={"shop-page__tabs"}
						/>
						{category.map((item, i) => (
							<TabContent index={i} value={valueTab} key={item.id}>
								<ShopCards idCategory={item.id} />
							</TabContent>
						))}
					</>
				) : (
					<div>Данных нет</div>
				)}
			</div>
		</div>
	);
};
