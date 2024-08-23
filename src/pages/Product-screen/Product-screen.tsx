import { useParams } from "react-router-dom";
import "./product-screen.scss";
import Header from "../../Components/Header/Header";
import { ShopHead } from "../../Components/Shop/Shop-head";
import { ShopButton } from "../../Components/Shop/Shop-button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addBasket, basketSelector } from "../../Redux/slice/shopSlice";
import plug from "../../assets/image/plug.png";
import { IMAGE_URL } from "../../http";
import { Preloader } from "../../Components/Preloader/Preloader";
import { IShopProduct } from "../../models/IShop";
import { useGetProductByIdQuery } from "../../services/shop.api";
import HeaderActive from "../../Components/Header-active/Header-active";
import { Back } from "../../Components/Back/Back";

export const ProductScreen = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const basket = useAppSelector(basketSelector);
	const { data: product, isLoading } = useGetProductByIdQuery(
		Number(params.id)
	);
	const addProductToBasket = async (product: IShopProduct) =>
		dispatch(addBasket(product));

	const titleButton = (id: number) =>
		basket.find((item) => item.id === id)
			? "Убрать из корзины"
			: "Добавить в корзину";

	return (
		<div>
			{window.innerWidth > 500 ? <HeaderActive /> : ""}
			<div className={"product-screen"}>
				<Back content={"Награда"} />
				<ShopHead marginBottom={42} />
				<div className="product-screen__wrapper">
					{isLoading ? (
						<Preloader height={"auto"} />
					) : product ? (
						<>
							<div className="product-screen__image">
								<img
									src={
										product?.image ? IMAGE_URL + "shop/" + product.image : plug
									}
									alt={product?.image}
								/>
							</div>
							<div className="product-screen__block">
								<div className="product-screen__title block-title">
									{product?.title}
								</div>
								<div className={"product-screen__detailed-information"}>
									<div className="product-screen__description">
										{product?.description}
									</div>
									{product?.promocode && (
										<>
											<div className="product-screen__promo-title title-17">
												Промокод: {product.promocode.code}
											</div>
											<div className="product-screen__promo-annotation">
												{product.promocode.annotation}
											</div>
										</>
									)}
								</div>
								<div className="product-screen__button">
									<ShopButton
										title={titleButton(product.id)}
										rewardCount={product?.price || 0}
										onClick={() => addProductToBasket(product)}
									/>
									<div className="product-screen__footnote">
										В наличии {product?.quantity} шт.
									</div>
								</div>
							</div>
						</>
					) : (
						<div>Данных нет</div>
					)}
				</div>
			</div>
		</div>
	);
};
