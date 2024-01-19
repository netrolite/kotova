import AvatarWithFallback from "@/components/AvatarWithFallback";
import { User } from "@prisma/client";

type Props = {
  user: User | null;
};

export default function SubjectTestListTestAvatar({ user }: Props) {
  const { image } = user || {};
  return <AvatarWithFallback src={image || undefined} />;
}
