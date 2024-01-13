import { auth } from "@/auth";
import HeaderSignInBtn from "../SignInBtn";
import HeaderAvatar from "../Avatar/Index";
import { SessionProvider } from "next-auth/react";

export default async function HeaderRightSectionContent() {
  const session = await auth();

  let content = <HeaderSignInBtn />;
  if (session?.user?.id) content = <HeaderAvatar />;

  return <SessionProvider session={session}>{content}</SessionProvider>;
}
