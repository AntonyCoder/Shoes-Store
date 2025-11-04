export interface ICatalogItem {
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
  sizes: ICatalogItemSize[];
}

export interface ICatalogItemSize {
  size: string;
  available: boolean;
}

export interface ICatalogItemState {
  item: ICatalogItem | null;
  loading: boolean;
  error: null | string;
}
