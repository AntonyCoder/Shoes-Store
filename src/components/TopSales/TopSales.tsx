import './TopSales.css';
import { useEffect } from 'react';
import Product from '../Product/Product';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchTopSales } from '@/features/topSales/topSalesThunks';

const TopSales: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {items.map((item) => (
          <Product key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default TopSales;
