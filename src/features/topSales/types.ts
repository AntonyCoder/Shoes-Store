import type { IProduct } from "../catalog/types";

export interface ITopSalesState {
  items: IProduct[];
  loading: boolean;
  error: string | null;
}
