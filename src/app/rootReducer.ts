import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducers from '@/features/categories/categoriesSlice';
import topSalesReducers from '@/features/topSales/topSalesSlice';
import catalogReducers from '@/features/catalog/catalogSlice';
import catalogItemReducer from '@/features/catalogItem/catalogItemSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducers,
  topSales: topSalesReducers,
  catalog: catalogReducers,
  catalogItem: catalogItemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
