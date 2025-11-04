import type { IProductProps } from './types';
import { Link } from 'react-router-dom';
import './Product.css';

const Product: React.FC<IProductProps> = ({ data }) => {
  const { title, price, images, id } = data;

  return (
    <div className="col-4 mb-3">
      <div className="card catalog-item-card">
        <img src={images[0]} className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
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
