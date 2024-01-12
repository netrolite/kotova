import { CheckedState } from "@radix-ui/react-checkbox";

export default function parseCheckedState(state: CheckedState): boolean {
  if (state === "indeterminate") return false;
  return state;
}
