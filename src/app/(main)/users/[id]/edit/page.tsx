import { redirect } from "next/navigation";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import UserEditProfileForm from "@/components/userProfile/edit/Form";

export default async function UserEdit(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const signedInUser = await getSignedInUserOrRedirect();
  if (signedInUser.id !== id) {
    redirect(`/users/${signedInUser.id}/edit`);
  }

  return <UserEditProfileForm user={signedInUser} />;
}
