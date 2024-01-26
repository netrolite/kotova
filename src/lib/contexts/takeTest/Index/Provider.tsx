"use client";

import { PropsWithChildren } from "react";
import TakeTestContext, { TakeTestContextType } from "./Index";

type Props = PropsWithChildren<TakeTestContextType>;

export default function TakeTestContextProvider(props: Props) {
  return (
    <TakeTestContext.Provider value={props}>
      {props.children}
    </TakeTestContext.Provider>
  );
}
