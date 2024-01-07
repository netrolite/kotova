export type SelectItemValueType = string | number;

type SelectItemType<T extends SelectItemValueType> = {
  label: string;
  value: T;
};

export default SelectItemType;
