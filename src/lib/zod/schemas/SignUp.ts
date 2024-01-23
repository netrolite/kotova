import { z } from "zod";
import SignInSchema from "./SignIn";
import { NAME_MAX_LEN } from "@/lib/constants";

const SignUpSchema = SignInSchema.extend({
  name: z
    .string()
    .min(1, { message: "Имя не заполнено" })
    .max(NAME_MAX_LEN, {
      message: `Имя не должно быть длиннее ${NAME_MAX_LEN} символов`,
    }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignUpSchemaInputType = z.input<typeof SignUpSchema>;

export default SignUpSchema;
