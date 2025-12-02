import type { ICartState } from '@/features/cart/types';

const defaultCartState: ICartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

//Функция для загрузки состояния корзины из LocalStorage
export const loadCart = (): ICartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (!serializedState) return defaultCartState;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Не удалось загрузить корзину из localStorage', error);
    return defaultCartState;
  }
};

//Функция для сохранения состояния корзины в LocalStorage
export const saveCart = (state: ICartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (error) {
    console.error('Не удалось сохранить корзину в localStorage', error);
  }
};
