import { create } from "zustand";

type AddTestStore = {
  isQuestionTypeDialogOpen: boolean;
  setIsQuestionTypeDialogOpen: (val: boolean) => void;
};

const useAddTestFormStore = create<AddTestStore>()((set, get) => ({
  isQuestionTypeDialogOpen: false,
  setIsQuestionTypeDialogOpen: (val) => set({ isQuestionTypeDialogOpen: val }),
}));

export default useAddTestFormStore;
