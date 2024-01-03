"use client";

import { ReactNode, createContext, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/shadcnUtils";
import ReactStateSetter from "@/lib/types/SetState";
import { Button } from "./ui/button";

type Props = {
  children: ReactNode;
  trigger: ReactNode;
  description?: string;
  title?: string;
  childrenContainerClassName?: string;
};

type CustomDrawerContextType = null | [boolean, ReactStateSetter<boolean>];
export const CustomDrawerContext = createContext<CustomDrawerContextType>(null);

export default function CustomDrawer({
  children,
  trigger,
  description,
  childrenContainerClassName,
  title,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldShowHeader = title || description;
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {shouldShowHeader && (
          <DrawerHeader className="text-left">
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <div className={cn("p-4", childrenContainerClassName)}>
          <CustomDrawerContext.Provider value={[isOpen, setIsOpen]}>
            {children}
          </CustomDrawerContext.Provider>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Отменить</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
