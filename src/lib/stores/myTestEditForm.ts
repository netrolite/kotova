import { create } from "zustand";

type MyTestEditStore = {
  isQuestionTypeDialogOpen: boolean;
  setIsQuestionTypeDialogOpen: (val: boolean) => void;
};

const useMyTestEditFormStore = create<MyTestEditStore>()((set, get) => ({
  isQuestionTypeDialogOpen: false,
  setIsQuestionTypeDialogOpen: (val) => set({ isQuestionTypeDialogOpen: val }),
}));

export default useMyTestEditFormStore;
