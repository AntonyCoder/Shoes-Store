import type { ICartState } from '@/features/cart/types';

//Функция для загрузки состояния корзины из LocalStorage
export const loadCart = (): ICartState | undefined => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Не удалось загрузить корзину из localStorage', error);
    return undefined;
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
