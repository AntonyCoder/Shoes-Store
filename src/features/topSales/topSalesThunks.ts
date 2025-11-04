import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from '../catalog/types';
import getTopSales from '@/services/topSalesServices';

export const fetchTopSales = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
  'topSales/fetchTopSales',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTopSales();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
