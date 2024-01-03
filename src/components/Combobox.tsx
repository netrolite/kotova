"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/shadcnUtils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export type ComboboxItem<T extends ComboboxItemValue> = {
  value: T;
  label: string;
};

type ComboboxItemValue = number | string;

type Props<T extends ComboboxItemValue> = {
  items: ComboboxItem<T>[];
  emptyMsg?: string;
  selectMsg?: string;
  inputPlaceholder?: string;
};

export function Combobox<T>({
  items,
  emptyMsg = "Не найдено",
  inputPlaceholder,
  selectMsg = "Выберите...",
}: Props<T extends ComboboxItemValue ? ComboboxItemValue : ComboboxItemValue>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
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
          <CommandInput placeholder={inputPlaceholder} />
          <CommandEmpty>{emptyMsg}</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={String(item.value)}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
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
