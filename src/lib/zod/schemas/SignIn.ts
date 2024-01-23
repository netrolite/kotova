import { z } from "zod";
import { PASSWORD_MAX_LEN, PASSWORD_MIN_LEN } from "@/lib/constants";

const SignInSchema = z.object({
  email: z.string().email({ message: "Неверный формат электронной почты" }),
  password: z
    .string()
    .min(PASSWORD_MIN_LEN, {
      message: `Пароль должен быть не короче ${PASSWORD_MIN_LEN} символов`,
    })
    .max(PASSWORD_MAX_LEN, {
      message: `Пароль должен быть не длиннее ${PASSWORD_MAX_LEN} символов`,
    }),
  callbackUrl: z.string().nullable(),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignInSchemaInputType = z.input<typeof SignInSchema>;

export default SignInSchema;
