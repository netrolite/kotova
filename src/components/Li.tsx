import { cn } from "@/lib/shadcnUtils";

type Props = {
  title: string;
  value: string | number;
  titleClassName?: string;
  valueClassName?: string;
};

export default function Li({
  title,
  value,
  titleClassName,
  valueClassName,
}: Props) {
  return (
    <li className="space-x-2">
      <span className={cn("text-muted-foreground", titleClassName)}>
        {title}
      </span>
      <span className={cn("font-semibold", valueClassName)}>{value}</span>
    </li>
  );
}
