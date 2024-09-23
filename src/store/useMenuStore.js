import axios from "axios";
import { create } from "zustand";

const useMenuStore = create((set) => ({
  loading: false,
  error: null,
  grandParents: [],
  parents: [],
  selectedParentId: null,

  fetchGrandParents: async (language) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `http://65.1.136.0:5050/api/categoryTopLevel?lan=${language}` // o'zgartirish
      );
      set({ grandParents: res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchParents: async (categoryId, language) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `http://65.1.136.0:5050/api/categoryChildren?lan=${language}`,
        { categoryid: categoryId }
      );
      set({ parents: res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  selectParent: (parentId) => set({ selectedParentId: parentId }),
}));

export default useMenuStore;
