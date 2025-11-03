import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducers from '@/features/categories/categoriesSlice';
import topSalesReducers from '@/features/topSales/topSalesSlice';
import catalogReducers from '@/features/catalog/catalogSlice'

export const rootReducer = combineReducers({
  categories: categoriesReducers,
  topSales: topSalesReducers,
  catalog: catalogReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
