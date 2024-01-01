import { cn } from "@/lib/shadcnUtils";

type Props = {
  title: string;
  value: string | number;
  titleClassName?: string;
  valueClassName?: string;
};

export default function KeyValue({
  title,
  value,
  titleClassName,
  valueClassName,
}: Props) {
  return (
    <div className="space-x-2">
      <span className={cn("text-muted-foreground", titleClassName)}>
        {title}
      </span>
      <span className={cn("font-semibold", valueClassName)}>{value}</span>
    </div>
  );
}
