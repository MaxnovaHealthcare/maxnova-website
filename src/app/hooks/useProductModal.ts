import create from "zustand";

interface ProductData {
  name: string;
  subbrand: string;
  image?: string;
  ingredients?: string;
  usp?: string;
  category?: string;
}

interface ProductModalState {
  isOpen: boolean;
  product: ProductData | null;
  openModal: (product: ProductData) => void;
  closeModal: () => void;
}

export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  product: null,
  openModal: (product) => set({ isOpen: true, product }),
  closeModal: () => set({ isOpen: false, product: null }),
}));
