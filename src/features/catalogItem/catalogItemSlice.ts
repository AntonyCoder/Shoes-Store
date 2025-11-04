import { createSlice } from '@reduxjs/toolkit';
import { fetchCatalogItem } from './catalogItemThunks';
import type { ICatalogItemState } from './types';

const initialState: ICatalogItemState = {
  item: null,
  loading: false,
  error: null,
};

const catalogItemSlice = createSlice({
  name: 'catalogItem',
  initialState,
  reducers: {
    clearItem: (state) => {
      state.item = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchCatalogItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка загрузки категории';
      });
  },
});
export const {clearItem} = catalogItemSlice.actions;
export default catalogItemSlice.reducer;
