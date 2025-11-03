export interface IProduct {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  oldPrice?: number;
  sizes: IProductSize[];
}

export interface IProductSize {
  size: string;
  available: boolean;
}

export interface IProductState{
  items: IProduct[],
  loading: boolean,
  error: string | null,
  hasMore: boolean
}
