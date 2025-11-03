export interface ITopSales {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface ITopSalesState {
  items: ITopSales[];
  loading: boolean;
  error: string | null;
}
