import { z } from "zod";
import emailValidator from "email-validator";
import { EMAIL_MAX_LEN, PHONE_MAX_LEN, PHONE_MIN_LEN } from "@/lib/constants";

const NAME_MIN_LEN = 3;
const NAME_MAX_WORDS = 5;
const NAME_MAX_LEN = 100;

const UserEditSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LEN, `Имя должно быть не короче ${NAME_MIN_LEN} символов`)
    .max(NAME_MAX_LEN, `Имя должно быть не длиннее ${NAME_MAX_LEN} символов`)
    .refine(
      (data) => data.split(" ").length <= NAME_MAX_WORDS,
      `Имя должно быть не длиннее ${NAME_MAX_WORDS} слов`,
    ),
  email: z
    .string()
    .max(
      EMAIL_MAX_LEN,
      `Электронная почта должна быть не длиннее ${EMAIL_MAX_LEN} символов`,
    )
    .transform((data) => (!data ? null : data))
    .refine((data) => (!data ? true : emailValidator.validate(data)), {
      message: "Неверный формат электронной почты",
    })
    .nullable(),
  phone: z
    .string()
    .transform((data) => data.replaceAll(/\D/g, ""))
    .transform((data) => (!data ? null : data))
    .nullable()
    .refine((data) => {
      if (!data) return true;
      return data.length >= PHONE_MIN_LEN;
    }, `Номер телефона должен быть не короче ${PHONE_MIN_LEN} символов (не учитывая любые символы, кроме цифр)`)
    .refine((data) => {
      if (!data) return true;
      return data.length <= PHONE_MAX_LEN;
    }, `Номер телефона должен быть не длиннее ${PHONE_MAX_LEN} символов (не учитывая любые символы, кроме цифр)`),
});

export type UserEditSchemaType = z.infer<typeof UserEditSchema>;
export type UserEditSchemaInputType = z.input<typeof UserEditSchema>;

export default UserEditSchema;
