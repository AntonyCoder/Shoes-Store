import apiClient from './apiClient';
import type { ICategories } from '@/features/categories/types';

//Фунция запроса категорий товаров
async function getCategories(): Promise<ICategories[]> {
  return apiClient<ICategories[]>('categories');
}

export default getCategories;
