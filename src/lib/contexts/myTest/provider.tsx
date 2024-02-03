"use client";

import { ReactNode } from "react";
import MyTestContext, { MyTestContextType } from ".";

export default function MyTestContextProvider(
  props: MyTestContextType & { children: ReactNode },
) {
  return (
    <MyTestContext.Provider value={props}>
      {props.children}
    </MyTestContext.Provider>
  );
}
