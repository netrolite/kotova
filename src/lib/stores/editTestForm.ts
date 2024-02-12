import { create } from "zustand";

type EditTestFormStore = {
  isEditTestDialogOpen: boolean;
  setIsEditTestDialogOpen: (val: boolean) => void;
};

const useEditTestFormStore = create<EditTestFormStore>()((set) => ({
  isEditTestDialogOpen: false,
  setIsEditTestDialogOpen: (val) => set({ isEditTestDialogOpen: val }),
}));

export default useEditTestFormStore;
