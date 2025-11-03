import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Banner from "@/components/Banner/Banner";

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
