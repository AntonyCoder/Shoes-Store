import './Header.css';
import { NavLink } from 'react-router';
import headerLogo from '@/assets/img/header-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { addSearchText } from '@/features/catalog/catalogSlice';
import { fetchCatalog } from '@/features/catalog/catalogThunks';

const Header: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { totalCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick() {
    if (!showForm) {
      setShowForm(true);
    } else if (showForm && searchValue.trim()) {
      submitForm();
    } else {
      setShowForm(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchValue.trim()) {
      submitForm();
    }
  }

  function submitForm() {
    dispatch(addSearchText(searchValue));
    dispatch(fetchCatalog({ search: searchValue }));

    navigate('/catalog');
    setSearchValue('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(addSearchText(searchValue));
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={headerLogo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts">
                    Контакты
                  </NavLink>
                </li>
              </ul>

              <div className="header-controls-pics">
                <div
                  data-id="search-expander"
                  className="header-controls-pic header-controls-search"
                  onClick={handleClick}></div>
                <NavLink to="/cart">
                  <div className="header-controls-pic header-controls-cart">
                    {totalCount > 0 ? (
                      <div className="header-controls-cart-full">{totalCount}</div>
                    ) : (
                      ''
                    )}

                    <div className="header-controls-cart-menu"></div>
                  </div>
                </NavLink>
              </div>
              <form
                onSubmit={handleSubmit}
                data-id="search-form"
                className={`header-controls-search-form form-inline ${
                  showForm ? '' : 'invisible'
                }`}>
                <input
                  className="form-control"
                  placeholder="Поиск"
                  onChange={handleChange}
                  value={searchValue}
                />
              </form>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
