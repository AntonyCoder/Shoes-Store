import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ICatalogItem } from './types';
import getCatalogItem from '@/services/catalogItemServices';

export const fetchCatalogItem = createAsyncThunk<ICatalogItem, number, { rejectValue: string }>(
  'catalogItem/fetchCatalogItem',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getCatalogItem(id);
      return data;
    } catch (error) {
      console.error('Ошибка загрузки каталога:', error);
      return rejectWithValue('Не удалось загрузить каталог');
    }
  }
);
