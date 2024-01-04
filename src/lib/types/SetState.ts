import { Dispatch, SetStateAction } from "react";

type ReactStateSetter<T> = Dispatch<SetStateAction<T>>;
export type ZustandStateSetter<T> = (val: T) => void;
export default ReactStateSetter;
