import apiClient from './apiClient';
import type { ICatalogItem } from '@/features/catalogItem/types';

//Функция запроса отдельного товара из каталога
async function getCatalogItem(id: number): Promise<ICatalogItem> {
  const url = `items/${id}`;
  return apiClient<ICatalogItem>(url);
}

export default getCatalogItem;
