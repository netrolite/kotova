import { create } from "zustand";

type AddSubjectStore = {
  isAddSubjectDialogOpen: boolean;
  setIsAddSubjectDialogOpen: (val: boolean) => void;
};

const useAddSubjectStore = create<AddSubjectStore>()((set) => ({
  isAddSubjectDialogOpen: false,
  setIsAddSubjectDialogOpen: (val) => set({ isAddSubjectDialogOpen: val }),
}));

export default useAddSubjectStore;
