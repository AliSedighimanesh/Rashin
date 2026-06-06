import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { CategoryManagementPage, AdminDashboardPage, AdminLoginPage, ProductManagementPage } from './pages/AdminPages.jsx';
import { AboutPage, BrandsPage, CategoriesPage, ContactPage, HomePage, OffersPage, ProductDetailPage, ProductsPage } from './pages/PublicPages.jsx';

function LanguageBoundary({ children }) {
  const { lang = 'fa' } = useParams();
  const safeLang = lang === 'en' ? 'en' : 'fa';
  useEffect(() => {
    document.documentElement.lang = safeLang;
    document.documentElement.dir = safeLang === 'fa' ? 'rtl' : 'ltr';
  }, [safeLang]);
  return children;
}

function LocalizedRoutes() {
  return (
    <LanguageBoundary>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </LanguageBoundary>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fa" replace />} />
      <Route path="/:lang/*" element={<LocalizedRoutes />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/products" element={<ProductManagementPage />} />
      <Route path="/admin/categories" element={<CategoryManagementPage />} />
      <Route path="*" element={<Navigate to="/fa" replace />} />
    </Routes>
  );
}
