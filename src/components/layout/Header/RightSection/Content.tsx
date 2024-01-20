import { auth } from "@/auth";
import HeaderSignInBtn from "../SignInBtn";
import HeaderAvatar from "../Avatar/Index";

export default async function HeaderRightSectionContent() {
  const session = await auth();

  if (session?.user?.id) return <HeaderAvatar {...{ session }} />;
  else return <HeaderSignInBtn />;
}
