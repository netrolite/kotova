import MainLayoutHeaderSignInBtn from "../SignInBtn";
import HeaderAvatar from "../Avatar/Index";
import getUrlFromHeaders from "@/lib/getUrlFromHeaders";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";

export default async function MainLayoutHeaderRightSectionContent() {
  const user = await getSignedInUser();
  const url = getUrlFromHeaders() || "/";

  if (user?.id) return <HeaderAvatar {...{ user }} />;
  else return <MainLayoutHeaderSignInBtn {...{ url }} />;
}
