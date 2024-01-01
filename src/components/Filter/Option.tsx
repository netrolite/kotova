import { cn } from "@/lib/shadcnUtils";
import { CheckIcon } from "lucide-react";

type Props = {
  onClick: () => void;
  isChecked: boolean;
  title: string;
};

export default function FilterOption({ isChecked, onClick, title }: Props) {
  return (
    <li className="flex gap-2" onClick={onClick}>
      <div className={cn("h-8 w-8 rounded-full", isChecked && "bg-primary")}>
        {isChecked && <CheckIcon />}
      </div>
      <div>{title}</div>
    </li>
  );
}
