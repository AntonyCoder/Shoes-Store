import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ICategories } from './types';
import getCategories from '@/services/categoriesService';

export const fetchCategories = createAsyncThunk<ICategories[], void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategories();
      return [{ id: 0, title: 'Все' }, ...data];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
