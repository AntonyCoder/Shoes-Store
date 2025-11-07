export interface IProduct {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface IProductState {
  items: IProduct[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  search: string;
}
