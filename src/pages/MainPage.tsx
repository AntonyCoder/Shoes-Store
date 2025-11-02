import Catalog from "@/components/Catalog/Catalog";
import TopSales from "@/components/TopSales/TopSales";
import MainLayout from "@/layouts/MainLayout";

const MainPage: React.FC = () => {
  return (
    <MainLayout>
      <TopSales />
      <Catalog />
    </MainLayout>
  );
};

export default MainPage;
