import { ResponsiveDialogContext } from "@/components/ResponsiveDialog";
import useContextVal from "./useContextVal";

export default function useResponsiveDialogState() {
  return useContextVal(ResponsiveDialogContext);
}
