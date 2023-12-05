import {IOrders, IShopCategory, IShopProduct} from '../models/IShop'
import {api} from "./api";

export const shopApi = api.injectEndpoints({
    endpoints: (build) => ({
        sendOrder: build.mutation<{ success: 1 | 0 }, number[]>({
            query: (products    ) => ({
                url: `orders?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: {products:JSON.stringify(products)}
            })
        }),
        getProducts: build.query<IShopProduct[], number>({
            query: (id) => `products?token=${localStorage.getItem('token')}&category=${id}`,
            transformResponse: (response: { data: IShopProduct[] }): IShopProduct[] => response.data
        }),
        getProductById: build.query<IShopProduct, number>({
            query: (id) => `products/${id}?token=${localStorage.getItem('token')}&category=${id}`,
            transformResponse: (response: { data: IShopProduct }): IShopProduct => response.data
        }),
        getCategories: build.query<IShopCategory[], null>({
            query: () => `shop-categories?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IShopCategory[] }): IShopCategory[] => response.data
        }),
        getOrders: build.query<IOrders[], null>({
            query: () => `orders?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IOrders[] }): IOrders[] => response.data
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetOrdersQuery,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useSendOrderMutation
} = shopApi