import CatalogCategories from '../CatalogCategories/CatalogCategories';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCatalog } from '@/features/catalog/catalogThunks';
import Product from '../Product/Product';
import type { ICatalogProps } from './types';
import './Catalog.css';

const Catalog: React.FC<ICatalogProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { items, hasMore, loading } = useAppSelector((state) => state.catalog);
  const { selectedCategoryId } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCatalog({ categoryId: selectedCategoryId, offset: 0 }));
  }, [dispatch, selectedCategoryId]);

  function handleClick() {
    dispatch(fetchCatalog({ categoryId: selectedCategoryId, offset: items.length }));
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      <CatalogCategories />
      <div className="row">
        {items.map((item) => (
          <Product key={item.id} data={item} />
        ))}

        {hasMore && !loading && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={handleClick}>
              Загрузить ещё
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
