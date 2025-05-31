import { useEffect, useState } from "react";
import api from "../lib/api";
import { useViewMode } from "../hooks/use-view-mode";
import Spinner from "../components/spinner";
import type { Product } from "../types/index";
import ProductItem from "../components/product-item";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 20;
  const totalPages = Math.ceil(totalCount / limit);
  const mode = useViewMode(); // 리스트 or 그리드 랜덤으로 들어옴

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // 이 함수는 hooks로 빼려다가 규모에 비하면 불필요한 작업이라고 판단되어 페이지에 그대로 두었습니다.
  const fetchProducts = async () => {
    try {
      const skip = (page - 1) * limit;
      const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
      setProducts(res.data.products);
      setTotalCount(res.data.total);
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">상품 목록 페이지 ({mode})</h1>
        <button
          type="button"
          className=" bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/products/new")}
        >
          상품생성
        </button>
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
      <div className="flex gap-2 mt-4 justify-center">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-1 border rounded ${
                page === pageNumber ? "bg-blue-500 text-white" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
