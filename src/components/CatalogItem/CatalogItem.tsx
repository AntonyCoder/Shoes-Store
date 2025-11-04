import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchCatalogItem } from '@/features/catalogItem/catalogItemThunks';
import { clearItem } from '@/features/catalogItem/catalogItemSlice';
import './CatalogItem.css';

const CatalogItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { item, loading, error } = useAppSelector((state) => state.catalogItem);

  useEffect(() => {
    dispatch(fetchCatalogItem(Number(id)));

    return () => {
      dispatch(clearItem());
    };
  }, [dispatch, id]);

  if (!item) {
    return <p className="text-center">Товар не найден</p>;
  }

  const { title, sku, manufacturer, color, material, season, reason, sizes, images } = item;

  return (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={images[0]} className="img-fluid" alt="" />
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
              Размеры в наличии:
              {sizes.map((item, index) => (
                <span
                  key={index}
                  className={`${item.available ? 'selected' : ''} catalog-item-size`}>
                  {item.size}
                </span>
              ))}
            </p>
            <p>
              Количество:{' '}
              <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary">-</button>
                <span className="btn btn-outline-primary">1</span>
                <button className="btn btn-secondary">+</button>
              </span>
            </p>
          </div>
          <button className="btn btn-danger btn-block btn-lg">В корзину</button>
        </div>
      </div>
    </section>
  );
};

export default CatalogItem;
