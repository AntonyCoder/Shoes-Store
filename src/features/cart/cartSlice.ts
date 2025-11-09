import { createSlice } from '@reduxjs/toolkit';
import type { ICartState } from './types';
import { loadCart, saveCart } from '@/utils/localStorage';

const initialState: ICartState = loadCart() || {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const exitingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (exitingItemIndex !== -1) {
        const exitingItem = state.items[exitingItemIndex];
        exitingItem.count += newItem.count;

        state.totalPrice += newItem.price * newItem.count;
      } else {
        state.items.push(newItem);
        state.totalPrice += newItem.price * newItem.count;
      }
      state.totalCount = state.items.reduce((total, item) => total + item.count, 0);

      saveCart(state);
    },
    removeItem: (state, action) => {
      const { id, price, count, size } = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);

      if (itemToRemove) {
        state.totalPrice -= price * count;
        state.items = state.items.filter((item) => !(item.id === id && item.size === size));
        state.totalCount = state.items.reduce((total, item) => total + item.count, 0);
      }

      saveCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      saveCart(state);
    },
  },
});

export const { addItemToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
