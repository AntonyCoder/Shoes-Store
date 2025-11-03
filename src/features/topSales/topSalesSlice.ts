import { createSlice } from '@reduxjs/toolkit';
import { fetchTopSales } from './topSalesThunks';
import type { ITopSalesState } from './types';

const initialState: ITopSalesState = {
  items: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка загрузки категории';
      });
  },
});

export default topSalesSlice.reducer;
