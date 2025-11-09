import { clearCart, removeItem } from '@/features/cart/cartSlice';
import type { ICartItem } from '@/features/cart/types';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { Link } from 'react-router-dom';
import sendCartOrder from '@/services/cartServices';
import formData from '@/utils/formData';
import { useState } from 'react';
import type { ICartOrderItem } from '@/features/cart/types';
import './Cart.css';
import Loader from '../Loader/Loader';

//Компонент корзины товаров
const Cart: React.FC = () => {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const dispatch = useAppDispatch();

  //Обработчик удаления товара из корзины
  function handleRemoveItem(item: ICartItem) {
    dispatch(removeItem(item));
  }

  //Формируем тело запроса и отправляем запрос на заказ
  function handleSendOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setOrderStatus('loading');

    try {
      const owner = formData(e);
      const cartItems: ICartOrderItem[] = createCartOrder();
      if (cartItems.length === 0) return;

      const cartOrder = {
        owner,
        items: cartItems,
      };

      sendCartOrder(cartOrder);

      setTimeout(() => {
        setOrderStatus('success');
        dispatch(clearCart());
        form.reset();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setOrderStatus('error');
      }, 2000);
    }
  }

  //Формируем массив с товарами
  function createCartOrder() {
    const cartItems: ICartOrderItem[] = [];
    items.forEach((item) => {
      cartItems.push({ id: item.id, price: item.price, count: item.count });
    });
    return cartItems;
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id + index}>
                <td scope="row">{index + 1}</td>
                <td>
                  <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.size}</td>
                <td>{item.count}</td>
                <td>{item.price + ' руб.'}</td>
                <td>{item.price * item.count + ' руб.'}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveItem(item)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>{totalPrice + ' руб.'}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ width: 30 + 'rem', margin: 0 + ' ' + 'auto' }}>
          <form className="card-body" onSubmit={handleSendOrder}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                name="phone"
                id="phone"
                placeholder="Ваш телефон"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                name="address"
                id="address"
                placeholder="Адрес доставки"
                required
              />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" required />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Оформить
            </button>
          </form>
        </div>
        {orderStatus === 'loading' ? (
          <Loader />
        ) : orderStatus === 'success' ? (
          <div className="success-order cart-order">Ваш заказ успешно оформлен!</div>
        ) : orderStatus === 'error' ? (
          <div className="error-order cart-order">Произошла ошибка при оформлении заказа!</div>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default Cart;
