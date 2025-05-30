import type { Product } from "../types/index";

interface Props {
  product: Product;
  viewMode: "list" | "grid";
}

export default function ProductItem({ product, viewMode }: Props) {
  const isList = viewMode === "list";

  return (
    <li
      className={`p-4 border border-gray-200 rounded shadow bg-white ${
        isList ? "flex gap-4 items-center" : ""
      }`}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className={
          isList
            ? "w-24 h-24 object-cover rounded"
            : "w-full h-40 object-cover rounded mb-2"
        }
      />
      <div className={isList ? "text-left" : ""}>
        <h2 className="font-semibold text-lg">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="text-sm mt-1">
          ⭐ {product.rating}점 / 리뷰 {product.reviews?.length ?? 0}개
        </div>
      </div>
    </li>
  );
}
