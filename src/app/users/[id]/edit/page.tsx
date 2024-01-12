import { redirect } from "next/navigation";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import UserEditProfileForm from "@/components/userProfile/edit/Form";

export default async function UserEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  const signedInUser = await getSignedInUserOrRedirect();
  if (signedInUser.id !== id) {
    redirect(`/users/${signedInUser.id}/edit`);
  }

  return <UserEditProfileForm user={signedInUser} />;
}
