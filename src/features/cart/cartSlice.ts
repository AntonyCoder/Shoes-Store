import { createSlice } from '@reduxjs/toolkit';
import type { ICartState } from './types';

const initialState: ICartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      state.items = [...state.items, item];
      state.totalCount = state.items.length;
      state.totalPrice += item.price * item.count;
    },
    removeItem: (state, action) => {
      const { id, price, count } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalCount = state.items.length;
      state.totalPrice -= price * count;
    },
  },
});

export const { addItemToCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
