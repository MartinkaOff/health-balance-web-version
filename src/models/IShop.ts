export interface IShopCategory {
  id: number
  name: string
}

export interface IShopProduct {
  id: number
  title: string
  description: string
  image: string
  price: number
  quantity: number
  position: number
  status: boolean,
  promocode:{
      id: number,
      annotation:string,
      code:string
  } | null
}

export interface IOrders {
  id: number
  customer: number,
  products: IShopProduct[]
  created_at: number
  status: boolean
}

export interface IBasket {
  id: number,
  image: string,
  title: string,
  price: number
}
