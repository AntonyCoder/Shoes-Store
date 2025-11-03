import { createSlice } from '@reduxjs/toolkit';
import { fetchCatalog } from './catalogThunks';
import type { IProductState } from './types';

const initialState: IProductState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.loading = false;

        const offset = action.meta.arg?.offset ?? 0;
        const fetched = action.payload;

        if (offset > 0) {
          state.items = [...state.items, ...fetched];
        } else {
          state.items = fetched;
        }

        state.hasMore = fetched.length >= 6;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка загрузки категории';
      });
  },
});

export default catalogSlice.reducer;
