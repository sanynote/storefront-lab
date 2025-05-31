import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

interface FormValues {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  brand: "Apple" | "Samsung" | "Weebur";
}

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      // 상품 생성 API 호출
      console.log(data, "data");
      await api.post("/products/add", data);
      navigate("/products");
    } catch (err) {
      console.error("상품 생성 실패", err);
    }
  };

  const price = watch("price") || 0;
  const discount = watch("discountPercentage") || 0;
  const finalPrice = price * (1 - discount / 100);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 제목 */}
      <div>
        <label className="block font-medium">상품명 (15자 이내) *</label>
        <input
          type="text"
          {...register("title", {
            required: "필수 항목입니다.",
            maxLength: { value: 15, message: "15자 이내로 입력해주세요." },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* 설명 */}
      <div>
        <label className="block font-medium">상품 설명</label>
        <textarea
          {...register("description")}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* 가격 */}
      <div>
        <label className="block font-medium">가격 (1000원 이상) *</label>
        <input
          type="number"
          {...register("price", {
            required: "가격은 필수입니다.",
            min: { value: 1000, message: "1000원 이상 입력해주세요." },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* 할인율 */}
      <div>
        <label className="block font-medium">할인율 (%)</label>
        <input
          type="number"
          {...register("discountPercentage", {
            max: { value: 100, message: "100 이하로 입력해주세요." },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.discountPercentage && (
          <p className="text-red-500 text-sm">
            {errors.discountPercentage.message}
          </p>
        )}
      </div>

      {/* 브랜드 */}
      <div>
        <label className="block font-medium">브랜드 *</label>
        <select
          {...register("brand", { required: "브랜드를 선택해주세요." })}
          className="w-full border p-2 rounded"
        >
          <option value="">선택하세요</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Weebur">Weebur</option>
        </select>
        {errors.brand && (
          <p className="text-red-500 text-sm">{errors.brand.message}</p>
        )}
      </div>

      {/* 최종 가격 */}
      <div className="text-right text-gray-700 text-sm">
        💰 최종 가격: {finalPrice.toFixed(2)}원
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        상품 생성
      </button>
    </form>
  );
}
