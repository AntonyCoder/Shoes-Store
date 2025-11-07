import apiClient from './apiClient';
import type { IProduct } from '@/features/catalog/types';

interface ICatalogParams {
  categoryId?: number | null;
  offset?: number;
  search?: string;
}

async function getCatalog(params: ICatalogParams = {}): Promise<IProduct[]> {
  const query = new URLSearchParams();
  

  if (params.categoryId) {
    query.append('categoryId', params.categoryId.toString());
  }

  if (params.offset) {
    query.append('offset', params.offset.toString());
  }

  if(params.search) {
    query.append('q', params.search.toString());
  }

  const url = params.toString() ? `items?${query}` : 'items';
  return apiClient<IProduct[]>(url);
}

export default getCatalog;
