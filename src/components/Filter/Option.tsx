import { cn } from "@/lib/shadcnUtils";
import { CheckIcon } from "lucide-react";

type Props = {
  onClick: () => void;
  isChecked: boolean;
  title: string;
};

export default function FilterOption({ isChecked, onClick, title }: Props) {
  return (
    <li className="flex items-center gap-2" onClick={onClick}>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border text-white",
          isChecked && "bg-primary",
        )}
      >
        {isChecked && <CheckIcon className="h-4 w-4" />}
      </div>
      <div>{title}</div>
    </li>
  );
}
