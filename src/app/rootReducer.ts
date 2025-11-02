import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducers from '@/features/categories/categoriesSlice';

export const rootReducer = combineReducers({
    categories: categoriesReducers,
})

export type RootState = ReturnType<typeof rootReducer>