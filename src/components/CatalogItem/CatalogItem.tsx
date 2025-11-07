import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCatalogItem } from '@/features/catalogItem/catalogItemThunks';
import { clearItem } from '@/features/catalogItem/catalogItemSlice';
import Loader from '../Loader/Loader';
import defaultPoster from '@/assets/img/poster_none.png';
import './CatalogItem.css';
import { addItemToCart } from '@/features/cart/cartSlice';

const CatalogItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const { item, loading, error } = useAppSelector((state) => state.catalogItem);
  const [activeButton, setActiveButton] = useState(false);
  const [selectSize, setSelectSize] = useState('');
  let [count, setCount] = useState(1);

  const itemImage = item?.images[0] ? item.images[0] : defaultPoster;
  const [imageSrc, setImageSrc] = useState(itemImage);

  useEffect(() => {
    dispatch(fetchCatalogItem(Number(id)));

    return () => {
      dispatch(clearItem());
    };
  }, [dispatch, id]);

  //Обработка ошибки загрузки изображения
  function handleImageError() {
    setImageSrc(defaultPoster);
  }

  //Обработчик выбора размера товара
  function handleSelectSize(size: string) {
    if (selectSize === size) {
      setSelectSize('');
      setActiveButton(false);
      return;
    }
    setSelectSize(size);
    setActiveButton(true);
  }

  //Обработчик изменения количества товара
  function handleChangeCount(e: React.MouseEvent<HTMLButtonElement>) {
    const symbol = e.currentTarget.textContent;
    if (symbol === '+' && count < 10) {
      setCount(++count);
    }
    if (symbol === '-' && count > 1) {
      setCount(--count);
    }
  }

  
  if (error) {
    return (
      <section className="catalog-item">
        <div>{error}</div>
      </section>
    );
  }
  
  if (!item || loading) {
    return (
      <section className="catalog-item">
        <Loader />
      </section>
    );
  }
  
  const { title, sku, manufacturer, color, material, season, reason, sizes, price } = item;

  //Обработчик добавления товара в корзину
  function handleAddToCart(){
    dispatch(addItemToCart({id, title, size: selectSize, count, price}))
    navigate('/cart')
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={imageSrc} className="img-fluid" alt={title} onError={handleImageError} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:{' '}
              {sizes.map((item, index) =>
                item.available ? (
                  <span
                    key={index}
                    className={`catalog-item-size ${selectSize === item.size ? 'selected' : ''}`}
                    onClick={() => handleSelectSize(item.size)}>
                    {item.size}
                  </span>
                ) : (
                  ''
                )
              )}
            </p>
            <p>
              Количество:{' '}
              <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary" onClick={handleChangeCount}>
                  -
                </button>
                <span className="btn btn-outline-primary">{count}</span>
                <button className="btn btn-secondary" onClick={handleChangeCount}>
                  +
                </button>
              </span>
            </p>
          </div>
          <button
            className={`btn btn-danger btn-block btn-lg ${activeButton ? '' : 'disabled'}`}
            onClick={handleAddToCart}>
            В корзину
          </button>
        </div>
      </div>
    </section>
  );
};

export default CatalogItem;
