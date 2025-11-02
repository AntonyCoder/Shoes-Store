import AboutPage from "@/pages/AboutPage";
import ContactsPage from "@/pages/ContactsPage";
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import CatalogPage from "@/pages/CatalogPage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

const DesctopRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default DesctopRouter;
