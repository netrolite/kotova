import { create } from "zustand";

type AddCategoryStore = {
  isAddCategoryDialogOpen: boolean;
  setIsAddCategoryDialogOpen: (val: boolean) => void;
};

const useAddCategoryStore = create<AddCategoryStore>()((set) => ({
  isAddCategoryDialogOpen: false,
  setIsAddCategoryDialogOpen: (val) => set({ isAddCategoryDialogOpen: val }),
}));

export default useAddCategoryStore;
