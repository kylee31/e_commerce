import { create } from "zustand";

type ProductEnableType = {
  isPreveiwProductDataChange: boolean;
  isCategoryProductDataChange: boolean;
  setPreviewProductDataChange: (bool: boolean) => void;
  setCategoryProductDataChange: (bool: boolean) => void;
};

//실시간 데이터 동기화 위해 enabled state 관리
const initialProductEnabled = {
  isPreveiwProductDataChange: false,
  isCategoryProductDataChange: false,
};

export const useProductEnabledStore = create<ProductEnableType>((set) => ({
  ...initialProductEnabled,
  setPreviewProductDataChange: (bool: boolean) =>
    set((state) => ({
      ...state,
      isPreveiwProductDataChange: bool,
    })),
  setCategoryProductDataChange: (bool: boolean) =>
    set((state) => ({
      ...state,
      isCategoryProductDataChange: bool,
    })),
}));

//state
export const usePreviewProductEnabledState = () =>
  useProductEnabledStore((state) => state.isPreveiwProductDataChange);
export const useCategoryProductEnabledState = () =>
  useProductEnabledStore((state) => state.isCategoryProductDataChange);
//action
export const usePreviewProductEnabledAction = () =>
  useProductEnabledStore((state) => state.setPreviewProductDataChange);
export const useCategoryProductEnabledAction = () =>
  useProductEnabledStore((state) => state.setCategoryProductDataChange);
