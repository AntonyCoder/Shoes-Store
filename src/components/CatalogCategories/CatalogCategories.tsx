import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCategories } from '@/features/categories/categoriesThunks';
import { setSelectedCategory } from '@/features/categories/categoriesSlice';
import './CatalogCategories.css';

const CatalogCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, selectedCategoryId } = useAppSelector((state) => state.categories);
  console.log(items);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleClick(id: number) {
    dispatch(setSelectedCategory(id));
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {items.map((item) => (
        <li className="nav-item" key={item.id}>
          <a
            className={`nav-link ${selectedCategoryId === item.id ? 'active' : ''}`}
            href="#"
            onClick={() => handleClick(item.id)}>
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CatalogCategories;
