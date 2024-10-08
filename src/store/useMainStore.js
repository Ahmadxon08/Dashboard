import { create } from "zustand";

const useMainStore = create((set) => ({
  openModalCarousel: false,
  openSidebar: false,
  activeButton: "",

  handleModalCarousel: (isOpen) => set({ openModalCarousel: isOpen }),

  // Method to open the sidebar
  handleOpenSidebar: () => set({ openSidebar: true }),

  // Method to close the sidebar
  handleCloseSidebar: () => set({ openSidebar: false }),

  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),

  setActiveButton: (buttonName) => set({ activeButton: buttonName }),
}));

export default useMainStore;
