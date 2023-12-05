import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IBasket, IShopProduct,} from "../../models/IShop";
import {showToast} from "../../utils/common-functions";

export interface IShop {
    basket: IBasket[];
}

const initialState: IShop = {
    basket: [],
};

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        addBasket(state, action: PayloadAction<IShopProduct>) {
            const {id} = action.payload
            const isExistProduct = state.basket.find((item) => item.id === id)
            if (isExistProduct) {
                state.basket = state.basket.filter(
                    (item) => item.id !== action.payload.id
                );
                showToast('Товар удален из корзины!')
            } else {
                state.basket = [...state.basket, action.payload];
                showToast('Товар добавлен в корзину!')
            }
        },
        clearBasket(state) {
            state.basket = []
        },
    },
});

export const {
    addBasket,
    clearBasket,
} = shopSlice.actions;

export const basketSelector = (state: RootState) => state.shop.basket;

export default shopSlice.reducer;
