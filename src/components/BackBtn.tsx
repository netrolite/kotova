"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./ui/button";

type Props = {} & ButtonProps;

export default function BackBtn({ children, ...props }: Props) {
  const router = useRouter();
  children = children || "Вернуться назад";
  return (
    <Button onClick={() => router.back()} {...props}>
      {children}
    </Button>
  );
}
