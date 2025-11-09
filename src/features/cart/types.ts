export interface ICartState {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}

export interface ICartItem {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
}

export interface ICartOrder {
  owner: {
    phone: string;
    address: string;
  };
  items: ICartOrderItem[];
}

export interface ICartOrderItem {
  id: number;
  price: number;
  count: number;
}
