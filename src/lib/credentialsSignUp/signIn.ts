import { signIn } from "@/auth";

type Params = {
  email: string;
  plaintextPassword: string;
};

export default function credentialsSignUpSignIn({
  email,
  plaintextPassword,
}: Params) {
  return signIn("credentials", {
    email,
    password: plaintextPassword,
    redirect: false,
  });
}
