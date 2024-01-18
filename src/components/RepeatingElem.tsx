import { ReactElement, cloneElement } from "react";
import getIterable from "../lib/getIterable";

type Props = {
  elem: ReactElement;
  count: number;
};

export default function RepeatingElem({ elem, count }: Props) {
  const iterable = getIterable(count);
  return iterable.map((_, i) => cloneElement(elem, { key: i }));
}
