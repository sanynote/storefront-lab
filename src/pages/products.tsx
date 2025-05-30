import { useEffect, useState } from "react";
import api from "../lib/api";
import { useViewMode } from "../hooks/use-view-mode";
import Spinner from "../components/spinner";
import type { Product } from "../types/index";
import ProductItem from "../components/product-item";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mode = useViewMode(); // 리스트 or 그리드 랜덤으로 들어옴

  useEffect(() => {
    fetchProducts();
  }, []);

  // 이 함수는 hooks로 빼려다가 규모에 비하면 불필요한 작업이라고 판단되어 페이지에 그대로 두었습니다.
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", { params: { limit: 20 } });
      console.log(res.data.products, "rere");
      setProducts(res.data.products);
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">상품 목록 페이지 ({mode})</h1>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul
          className={mode === "grid" ? "grid grid-cols-4 gap-4" : "space-y-4"}
        >
          {mode !== null &&
            products.map((product) => (
              <ProductItem key={product.id} product={product} viewMode={mode} />
            ))}
        </ul>
      )}
    </div>
  );
}
