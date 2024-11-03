"use client";

import BtnWithIcon from "@/components/Btns/WithIcon";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ComponentProps, ReactElement, ReactNode, cloneElement } from "react";

type Props = {
  icon?: ReactElement;
  formAction?: () => unknown;
  children: ReactNode;
} & ComponentProps<typeof BtnWithIcon>;

export default function HeaderAvatarDropdownMenuContentItem({
  icon,
  formAction,
  ...props
}: Props) {
  const btn = (
    <BtnWithIcon
      variant="ghost"
      icon={icon && cloneElement<any>(icon, { width: 16 })}
      className="w-full cursor-pointer justify-start"
      {...props}
    />
  );
  return (
    <DropdownMenuItem asChild>
      <form
        style={{ padding: 0 }}
        action={formAction}
        onSubmit={formAction ? undefined : (e) => e.preventDefault()}
      >
        {btn}
      </form>
    </DropdownMenuItem>
  );
}
