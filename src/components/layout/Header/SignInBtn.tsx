import { Button } from "@/components/ui/button";
import signInAction from "@/lib/actions/signIn";

export default function HeaderSignInBtn() {
  return (
    <form
      action={async () => {
        "use server";
        signInAction();
      }}
    >
      <Button>Войти</Button>
    </form>
  );
}
