import { signIn } from "@/auth";

type Params = {
  email: string;
  password: string;
};

export default function credentialsSignUpSignIn({ email, password }: Params) {
  return signIn("credentials", {
    email,
    password,
    redirect: false,
  });
}
