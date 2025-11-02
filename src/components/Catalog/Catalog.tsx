import CatalogCategories from "../CatalogCategories/CatalogCategories";
import "./Catalog.css";

const Catalog: React.FC = () => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CatalogCategories />
    </section>
  );
};

export default Catalog;
