import React, {FC, useCallback} from "react";
import {shopApi, useGetProductsQuery} from "../../services/shop.api";
import {Preloader} from "../Preloader/Preloader";
import {ShopCard} from "./Shop-card";
import {PullToRefresh} from "../PullToRefresh/PulltoRefresh";

interface IShopCards {
    idCategory: number
}

export const ShopCards: FC<IShopCards> = ({idCategory}) => {

    const {data: products, isLoading, refetch} = useGetProductsQuery(idCategory)
    const [updateCategories] = shopApi.endpoints.getCategories.useLazyQuery()

    const handleRefresh = useCallback(() => {
        refetch()
        updateCategories(null)
    }, [idCategory])

    if (isLoading) return <Preloader height={'auto'}/>

    return (
        <div className={'shop-cards'}>
            <PullToRefresh onTrigger={handleRefresh}/>
            {products?.map((product) => <ShopCard product={product} key={product.id}/>)}
        </div>
    )
}
