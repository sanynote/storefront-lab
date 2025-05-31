import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/products";
import ProductsNewPage from "./pages/products-new";

export default function App() {
  return (
    <Routes>
      {/* 초기 진입 시 products로 리디렉션 */}
      <Route path="/" element={<Navigate to="/products" replace />} />

      {/* 상품 리스트 */}
      <Route path="/products" element={<ProductsPage />} />

      {/* 상품 생성 */}
      <Route path="/products/new" element={<ProductsNewPage />} />
    </Routes>
  );
}
