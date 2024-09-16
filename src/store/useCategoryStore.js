// store/useCategoryStore.js
import { create } from "zustand";
import axios from "axios";

const useCategoryStore = create((set, get) => ({
  selectedCategoryId: null,
  currentPage: 1,
  totalItems: 1,
  uniqueItems: [],
  products: [],
  productDetails: null,
  loading: false,
  error: null,
  filterSelects: [],
  isCategoriesOpen: false,
  selectedGrandParentId: null,
  selectedParentId: null,
  filterSelectId: null,

  setFilterSelects: (newFilterSelects) =>
    set({ filterSelects: newFilterSelects }),

  setSelectedParentId: (id) => set({ selectedParentId: id }),
  setSelectedGrandParentId: (id) => set({ selectedGrandParentId: id }),
  setFilterSelectId: (id) => set({ filterSelectId: id }),

  ////
  setIsCategoriesOpen: (isOpen) => set({ isCategoriesOpen: isOpen }),
  setUniqueItems: (items) => set({ uniqueItems: items }),

  setSelectedCategoryId: (id) => {
    set({ selectedCategoryId: id });
  },
  setPage: (pageNum) => {
    set({ currentPage: pageNum });
    get().fetchProductsByCategoryId(get().selectedCategoryId);
  },

  fetchProductsByCategoryId: async (
    categoryId,
    pageNum = get().currentPage
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://65.1.136.0:5050/api/productsByCategoryId",
        {
          categoryid: categoryId,
          pageNum: pageNum,
        }
      );
      set({
        products: response.data,
        totalItems: response.data.total,
        currentPage: pageNum,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchProductDetails: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `http://65.1.136.0:5050/api/productsByProductId`,
        {
          productid: productId,
        }
      );
      set({
        productDetails: response.data,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  filterItemByCategoryId: (id) =>
    set((state) => ({
      uniqueItems: state?.uniqueItems.filter((item) => item.id === id),
    })),
}));

export default useCategoryStore;
