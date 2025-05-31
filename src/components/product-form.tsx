import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { InputField } from "./molecules/input-field";
import {
  isOptionalTextDecimal,
  isRequiredTextNumber,
} from "../utils/validators";
import { InputAreaField } from "./molecules/input-area-field";
import { Dropbox } from "./molecules/dropbox";

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
    control,
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

  const price = Number(watch("price")) || 0;
  const discount = Number(watch("discountPercentage")) || 0;
  const finalPrice = price * (1 - discount / 100);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="상품명"
        required
        type="text"
        {...register("title", {
          required: true,
          maxLength: 15,
        })}
        error={!!errors.title}
        helperText={
          errors.title?.type === "required"
            ? "필수 입력 항목입니다."
            : "15자 이내로 입력해주세요."
        }
      />

      <InputAreaField
        label="상품 설명"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <InputField
        label="가격"
        required
        inputMode="numeric"
        {...register("price", isRequiredTextNumber("가격", 1000))}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <InputField
        label="할인율"
        inputMode="decimal"
        step="0.01"
        {...register(
          "discountPercentage",
          isOptionalTextDecimal("할인율", 100)
        )}
        error={!!errors.discountPercentage}
        helperText={errors.discountPercentage?.message}
      />

      <Controller
        name="brand"
        control={control}
        rules={{ required: "브랜드를 선택해주세요." }}
        render={({ field, fieldState }) => (
          <Dropbox
            label="브랜드"
            required
            value={field.value}
            onChange={field.onChange}
            options={[
              { label: "Apple", value: "Apple" },
              { label: "Samsung", value: "Samsung" },
              { label: "Weebur", value: "Weebur" },
            ]}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

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
