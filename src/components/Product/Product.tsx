import type { IProductProps } from './types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultPoster from '@/assets/img/poster_none.png';
import './Product.css';

//Компонент карточки товара
const Product: React.FC<IProductProps> = ({ data }) => {
  const { title, price, images, id } = data;
  const [imageSrc, setImageSrc] = useState(images[0]);

  //Обработка ошибки загрузки изображения
  function handleImageError() {
    setImageSrc(defaultPoster);
  }

  return (
    <div className="col-4 mb-3">
      <div className="card catalog-item-card">
        <img
          src={imageSrc}
          className="card-img-top img-fluid"
          alt={title}
          onError={handleImageError}
        />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{`${price} руб.`}</p>
          <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
