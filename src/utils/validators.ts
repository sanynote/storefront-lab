export const isRequiredTextNumber = (label: string, min?: number) => {
  return {
    required: `${label}은(는) 필수 입력값입니다.`,
    validate: (value: string) => {
      if (!/^\d+$/.test(value)) return `${label}은(는) 숫자만 입력해주세요.`;
      if (min !== undefined && parseInt(value, 10) < min)
        return `${min} 이상 입력해주세요.`;
      return true;
    },
  } as any; // ✅ 강제 캐스팅으로 타입 에러 제거
};

export const isOptionalTextDecimal = (label: string, max?: number) => {
  return {
    validate: (value?: string) => {
      if (!value) return true;

      // 소수점 한 자리까지만 허용
      if (!/^\d+(\.\d)?$/.test(value)) {
        return `${label}은(는) 숫자이며 소수점 한 자리까지만 입력 가능합니다.`;
      }

      if (max !== undefined && parseFloat(value) > max) {
        return `${label}은(는) ${max} 이하만 가능합니다.`;
      }

      return true;
    },
  } as any;
};
