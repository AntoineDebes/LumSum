import create from "zustand";

export type FilterStore = {
  isFilterVisible: boolean;
  showFilter: () => void;
  hideFilter: () => void;

  activeProductFilters: {
    productRating: number;
    supplierRating: number;
    minPrice: number;
    maxPrice: number;
    brands: string[];
  };

  activeSupplierFilters: {
    supplierRating: number;
    brands: string[];
    categories: string[];
  };

  updateProductRating: any;
  updateSupplierRating: any;
  updateMinPrice: any;
  updateMaxPrice: any;
  updateBrands: any;
  updateCategories: any;
  clearAllFilters: any;
};

const useFilterStore = create<FilterStore>((set) => ({
  isFilterVisible: false,
  showFilter: () => set({ isFilterVisible: true }),
  hideFilter: () => set({ isFilterVisible: false }),

  activeProductFilters: {
    productRating: 0,
    supplierRating: 0,
    minPrice: 0,
    maxPrice: 0,
    brands: [],
  },

  activeSupplierFilters: {
    supplierRating: 0,
    brands: [],
    categories: [],
  },

  updateProductRating: (value: number) => {
    set((state) => ({
      activeProductFilters: {
        ...state.activeProductFilters,
        productRating: value,
      },
    }));
  },

  updateSupplierRating: (value: number) => {
    set((state) => ({
      activeProductFilters: {
        ...state.activeProductFilters,
        supplierRating: value,
      },
      activeSupplierFilters: {
        ...state.activeSupplierFilters,
        supplierRating: value,
      },
    }));
  },

  updateMinPrice: (price: number) => {
    set((state) => ({
      activeProductFilters: {
        ...state.activeProductFilters,
        minPrice: price,
      },
    }));
  },

  updateMaxPrice: (price: number) => {
    set((state) => ({
      activeProductFilters: {
        ...state.activeProductFilters,
        maxPrice: price,
      },
    }));
  },

  updateBrands: (brands: string[]) => {
    set((state) => ({
      activeProductFilters: {
        ...state.activeProductFilters,
        brands: brands,
      },
      activeSupplierFilters: {
        ...state.activeSupplierFilters,
        brands: brands,
      },
    }));
  },

  updateCategories: (categories: string[]) => {
    set((state) => ({
      activeSupplierFilters: {
        ...state.activeSupplierFilters,
        categories: categories,
      },
    }));
  },

  clearAllFilters: () => {
    set(() => ({
      activeProductFilters: {
        productRating: 0,
        supplierRating: 0,
        minPrice: 0,
        maxPrice: 0,
        brands: [],
      },
      activeSupplierFilters: {
        supplierRating: 0,
        brands: [],
        categories: [],
      },
    }));
  },
}));

export default useFilterStore;
