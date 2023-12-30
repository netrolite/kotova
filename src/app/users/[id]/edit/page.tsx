import { redirect } from "next/navigation";
import UserEditProfileForm from "@/components/routes/users/edit/Form";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";

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
