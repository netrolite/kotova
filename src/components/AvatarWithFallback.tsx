import { cn } from "@/lib/shadcnUtils";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  imgClassName?: string;
  userIconClassName?: string;
  containerClassName?: string;
  username?: string;
  src?: string;
  width?: number;
  sizes?: string;
};

/**
 * Please provide the `sizes` prop if you don't provide the `width` prop. Not required though!
 */
export default function AvatarWithFallback({
  userIconClassName,
  imgClassName,
  src,
  username,
  containerClassName,
  width = 32,
  sizes,
}: Props) {
  let content: ReactNode;
  if (src) {
    content = (
      <Image
        src={src}
        alt={`Фото профиля${username ? ` пользователя ${username}` : ""}`}
        className={cn("rounded-full", imgClassName)}
        style={{ objectFit: "cover" }}
        fill={width ? false : true}
        width={width}
        height={width}
        sizes={sizes}
      />
    );
  } else {
    content = (
      <UserIcon
        className={cn(`text-slate-400`, userIconClassName)}
        style={{ width, height: width }}
        role="avatar"
      />
    );
  }

  return (
    <div
      className={cn(
        `relative flex items-center justify-center rounded-full border`,
        containerClassName,
      )}
      style={{ width, height: width }}
    >
      {content}
    </div>
  );
}
