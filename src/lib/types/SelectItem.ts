export type SelectItemValue = string | number;

type SelectItem<T extends SelectItemValue> = {
  label: string;
  value: T;
};

export default SelectItem;
