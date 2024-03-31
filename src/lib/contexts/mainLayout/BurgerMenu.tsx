import ReactStateSetter from "@/lib/types/SetState";
import { createContext } from "react";

type MainLayoutBurgerMenyContextType = {
  isBurgerMenuOpen: boolean;
  setIsBurgerMenuOpen: ReactStateSetter<boolean>;
};
const MainLayoutBurgerMenyContext =
  createContext<MainLayoutBurgerMenyContextType | null>(null);
export default MainLayoutBurgerMenyContext;
