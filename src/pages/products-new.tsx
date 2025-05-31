import ProductForm from "../components/product-form";

export default function ProductCreatePage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 상품 생성</h1>
      <ProductForm />
    </div>
  );
}
