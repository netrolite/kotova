import { auth } from "@/auth";
import HeaderSignInBtn from "../SignInBtn";
import HeaderAvatar from "../Avatar/Index";
import getUrlFromHeaders from "@/lib/getUrlFromHeaders";

export default async function HeaderRightSectionContent() {
  const session = await auth();
  const url = getUrlFromHeaders() || "/";

  if (session?.user?.id) return <HeaderAvatar {...{ session }} />;
  else return <HeaderSignInBtn {...{ url }} />;
}
