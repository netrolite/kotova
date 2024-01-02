import AvatarWithFallback from "@/components/AvatarWithFallback";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export default function SubjectTestListTestAvatar({ user: { image } }: Props) {
  return <AvatarWithFallback width={24} src={image || undefined} />;
}
