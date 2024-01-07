import { ResponsiveDialogContext } from "@/components/ResponsiveDialog";
import useContextVal from "./contextVal";

export default function useResponsiveDialogState() {
  return useContextVal(ResponsiveDialogContext);
}
