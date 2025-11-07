import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from './types';
import getCatalog from '@/services/catalogServices';

interface IFetchCatalogArgs {
  categoryId?: number | null;
  offset?: number;
  search?: string;
}

export const fetchCatalog = createAsyncThunk<
  IProduct[],
  IFetchCatalogArgs | undefined,
  { rejectValue: string }
>('catalog/fetchCatalog', async (params, { rejectWithValue }) => {
  try {
    const data = await getCatalog(params);
    return data;
  } catch (error) {
    console.error('Ошибка загрузки каталога:', error);
    return rejectWithValue('Не удалось загрузить каталог');
  }
});
