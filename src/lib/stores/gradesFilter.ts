import { makeArr } from "@/lib/makeArr";
import { create } from "zustand";

type GradesFilterStore = {
  selectedGrades: number[];
  allGrades: number[];
  setSelectedGrades: (selectedGrades: number[]) => void;
  isFilterDialogOpen: boolean;
  setIsFilterDialogOpen: (isFilterDialogOpen: boolean) => void;
};

const useGradesFilterStore = create<GradesFilterStore>((set) => ({
  allGrades: makeArr({ from: 1, to: 11 }),
  selectedGrades: [],
  setSelectedGrades: (selectedGrades) => set({ selectedGrades }),
  isFilterDialogOpen: false,
  setIsFilterDialogOpen: (isFilterDialogOpen) => set({ isFilterDialogOpen }),
}));

export default useGradesFilterStore;
