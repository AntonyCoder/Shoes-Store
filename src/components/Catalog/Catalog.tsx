import CatalogCategories from '../CatalogCategories/CatalogCategories';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCatalog } from '@/features/catalog/catalogThunks';
import Product from '../Product/Product';
import type { ICatalogProps } from './types';
import './Catalog.css';
import Loader from '../Loader/Loader';

//Компонент каталога товаров
const Catalog: React.FC<ICatalogProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { items, hasMore, loading, search, error } = useAppSelector((state) => state.catalog);
  const { selectedCategoryId } = useAppSelector((state) => state.categories);

  //Загрузка каталога при монтировании компонента 
  useEffect(() => {
    dispatch(fetchCatalog({ categoryId: selectedCategoryId, offset: 0, search }));
  }, [dispatch, selectedCategoryId]);

  //Обработчик нажатия на кнопку Загрузить еще
  function handleClick() {
    dispatch(fetchCatalog({ categoryId: selectedCategoryId, offset: items.length, search }));
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Ошибка загрузки данных</div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

export default Catalog;
