// store/useCategoryStore.js
import { create } from "zustand";
import axios from "axios";

const useRelativeStore = create((set, get) => ({
  selectedCategoryId: null,
  currentPage: 1,

  products: [],

  loading: false,
  error: null,

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

  fetchProductsByTypeId: async (
    categoryId = get().selectedCategoryId,
    pageNum = get().currentPage,
    language
  ) => {
    set({ loading: true, error: null });
    try {
      if (!categoryId) throw new Error("Category ID is required");

      const response = await axios.post(
        `http://65.1.136.0:5050/api/productsByCategoryId?lan=${language}`,
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
}));

export default useRelativeStore;
