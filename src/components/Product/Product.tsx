import type { ITopSales } from '@/features/topSales/types';
import './Product.css'

interface IProductProps {
  data: ITopSales;
}

const Product: React.FC<IProductProps> = ({ data }) => {
  const { title, price, images } = data;

  return (
    <div className="col-4 mb-3">
      <div className="card catalog-item-card">
        <img src={images[0]} className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{`${price} руб.`}</p>
          <a href="#" className="btn btn-outline-primary">
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
