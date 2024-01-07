import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/shadcnUtils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ZustandStateSetter } from "@/lib/types/SetState";
import SelectItemType, { SelectItemValueType } from "@/lib/types/SelectItem";

type Props<T extends SelectItemValueType> = {
  items: SelectItemType<T>[];
  notFoundMsg?: string;
  selectMsg?: string;
  isOpen: boolean;
  setIsOpen: ZustandStateSetter<boolean>;
  value: string | null;
  setValue: ZustandStateSetter<string | null>;
};

export function Combobox<T extends SelectItemValueType>({
  items,
  notFoundMsg = "Не найдено",
  selectMsg = "Выберите...",
  isOpen,
  setIsOpen,
  setValue,
  value,
}: Props<T>) {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : selectMsg}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandEmpty>{notFoundMsg}</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={String(item.value)}
                onSelect={(currVal) => {
                  setValue(currVal === value ? null : currVal);
                  setIsOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
