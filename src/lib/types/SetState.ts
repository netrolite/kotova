import { Dispatch, SetStateAction } from "react";

type ReactStateSetter<T> = Dispatch<SetStateAction<T>>;
export default ReactStateSetter;
