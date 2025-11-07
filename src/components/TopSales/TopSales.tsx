import './TopSales.css';
import { useEffect } from 'react';
import Product from '../Product/Product';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchTopSales } from '@/features/topSales/topSalesThunks';

const TopSales: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Ошибка загрузки данных</div>
      ) : (
        <div className="row">
          {items.map((item) => (
            <Product key={item.id} data={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSales;
