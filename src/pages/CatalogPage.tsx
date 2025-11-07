import Catalog from '@/components/Catalog/Catalog';
import Search from '@/components/Search/Search';
import MainLayout from '@/layouts/MainLayout';

const CatalogPage: React.FC = () => {
  return (
    <MainLayout>
      <Catalog>
        <Search />
      </Catalog>
    </MainLayout>
  );
};

export default CatalogPage;
