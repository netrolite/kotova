"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { cn } from "@/lib/shadcnUtils";
import ReactStateSetter from "@/lib/types/SetState";

type Props = {
  children: ReactNode;
  trigger: ReactNode;
  description?: string;
  title?: string;
  drawerChildrenContainerClassName?: string;
};

type ResponsiveDialogContextType = null | [boolean, ReactStateSetter<boolean>];
export const ResponsiveDialogContext =
  createContext<ResponsiveDialogContextType>(null);

export default function ResponsiveDialog({
  children,
  trigger,
  title,
  description,
  drawerChildrenContainerClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldShowHeader = title || description;

  useEffect(() => {
    if (!width) return;
    if (width > 768) setIsDesktop(true);
    else setIsDesktop(false);
  }, [width]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {shouldShowHeader && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          <ResponsiveDialogContext.Provider value={[isOpen, setIsOpen]}>
            {children}
          </ResponsiveDialogContext.Provider>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
        <div className={cn("p-4", drawerChildrenContainerClassName)}>
          <ResponsiveDialogContext.Provider value={[isOpen, setIsOpen]}>
            {children}
          </ResponsiveDialogContext.Provider>
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
