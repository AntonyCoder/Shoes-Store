import apiClient from './apiClient';
import type { ICartOrder } from '@/features/cart/types';

interface IOrderResponse {
  success: boolean;
  orderId: number;
}

//Функция отправки запроса при заказе товара
async function sendCartOrder(order: ICartOrder) {
  return apiClient<IOrderResponse>('order', {
    method: 'POST',
    body: order,
  });
}

export default sendCartOrder;
