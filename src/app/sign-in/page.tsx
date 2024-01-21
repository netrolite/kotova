import { signIn } from "@/auth";
import BtnWithIcon from "@/components/Btns/WithIcon";
import PageTitle from "@/components/PageTitle";
import getEnvVar from "@/lib/getEnvVar";
import { redirect } from "next/navigation";

export default function SignIn() {
  return (
    <>
      <PageTitle>Войти в аккаунт</PageTitle>
      <form>
        <BtnWithIcon
          formAction={async () => {
            "use server";
            signIn("yandex");
          }}
        >
          Войти с Яндекс
        </BtnWithIcon>
        <BtnWithIcon
          formAction={async () => {
            "use server";
            signIn("google");
          }}
        >
          Войти с Google
        </BtnWithIcon>
        <BtnWithIcon
          formAction={async () => {
            "use server";
            const redirectUrlOrigin = getEnvVar("VERCEl_URL");
            const clientId = getEnvVar("AUTH_VK_ID");
            redirect(
              `https://oauth.vk.com/authorize?display=page&v=5.132&response_type=code&client_id=${clientId}&redirect_uri=${redirectUrlOrigin}/api/auth/callback/vk`,
            );
          }}
        >
          Войти с Вконтакте
        </BtnWithIcon>
      </form>
    </>
  );
}
