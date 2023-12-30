"use client";

import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery, useWindowSize } from "@uidotdev/usehooks";
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

type Props = {
  children: ReactNode;
  trigger: ReactNode;
  description?: string;
  title?: string;
  drawerChildrenContainerClassName?: string;
};

export default function ResponsiveDialog({
  children,
  trigger,
  title,
  description,
  drawerChildrenContainerClassName,
}: Props) {
  const [open, setOpen] = useState(false);
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
      <Dialog open={open} onOpenChange={setOpen}>
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
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
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
          {children}
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