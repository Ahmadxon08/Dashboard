import axios from "axios";
import { create } from "zustand";

const useMenuStore = create((set) => ({
  loading: false,
  error: null,
  parents: [],
  categoryChildren: [],
  selectedParentId: null,

  fetchParents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        "http://65.1.136.0:5050/api/categoryTopLevel"
      );
      set({ parents: res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategoryChildren: async (categoryId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        "http://65.1.136.0:5050/api/categoryChildren",
        { categoryid: categoryId }
      );
      set({ categoryChildren: res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  selectParent: (parentId) => set({ selectedParentId: parentId }),
}));

export default useMenuStore;
