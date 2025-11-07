import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCatalog } from '@/features/catalog/catalogThunks';
import { addSearchText } from '@/features/catalog/catalogSlice';
import './Search.css';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCategoryId } = useAppSelector((state) => state.categories);
  const { search } = useAppSelector((state) => state.catalog);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const query = formData.get('search');
    const search = typeof query === 'string' ? query : undefined;

    dispatch(addSearchText(search));
    dispatch(fetchCatalog({ search, categoryId: selectedCategoryId }));
  }
  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input
        className="form-control"
        placeholder="Поиск"
        name="search"
        value={search}
        onChange={(e) => dispatch(addSearchText(e.target.value))}
      />
    </form>
  );
};

export default Search;
