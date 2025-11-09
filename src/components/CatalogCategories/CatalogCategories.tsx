import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCategories } from '@/features/categories/categoriesThunks';
import { setSelectedCategory } from '@/features/categories/categoriesSlice';
import './CatalogCategories.css';

//Компонент категорий товаров
const CatalogCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, selectedCategoryId } = useAppSelector((state) => state.categories);

  //Запрос данных при монтировании компонента
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //Обработчик смены категории товаров
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: number) {
    e.preventDefault();
    dispatch(setSelectedCategory(id));
  }

  return (
    <ul className="catalog-categories nav justify-content-center mb-5">
      {items.map((item) => (
        <li className="nav-item" key={item.id}>
          <a
            className={`nav-link ${selectedCategoryId === item.id ? 'active' : ''}`}
            onClick={(e) => handleClick(e, item.id)}>
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CatalogCategories;
