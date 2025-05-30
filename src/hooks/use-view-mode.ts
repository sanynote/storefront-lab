// src/hooks/useViewMode.ts
import { useEffect, useState } from "react";

type ViewMode = "list" | "grid";

const STORAGE_KEY = "product_view_mode";

interface ViewModeStorage {
  mode: ViewMode;
  expiresAt: number;
}

export const useViewMode = (): ViewMode | null => {
  const [mode, setMode] = useState<ViewMode | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (saved) {
      const parsed: ViewModeStorage = JSON.parse(saved);
      if (parsed.expiresAt > now) {
        setMode(parsed.mode);
        return;
      }
    }

    // 새로운 랜덤 값 저장
    const random = Math.random() > 0.5 ? "grid" : "list";
    // const expiresAt = now + 24 * 60 * 60 * 1000; // 24시간 후 만료

    const expiresAt = now + 10 * 1000; // 테스트용 (10초 후 만료)
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode: random, expiresAt })
    );
    setMode(random);
  }, []);

  return mode;
};
