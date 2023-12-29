import { z } from "zod";
const NAME_MIN_LEN = 3;
const NAME_MAX_WORDS = 5;
const NAME_MAX_LEN = 100;
const EMAIL_MAX_LEN = 254;
const PHONE_MIN_LEN = 5;
const PHONE_MAX_LEN = 20;
const AVATAR_URL_MAX_LEN = 300;

const UserEditSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LEN, `Имя должно быть не короче ${NAME_MIN_LEN} символов`)
    .max(NAME_MAX_LEN, `Имя должно быть не длиннее ${NAME_MAX_LEN} символов`)
    .refine(
      (data) => data.split(" ").length <= NAME_MAX_WORDS,
      `Имя должно иметь не длиннее ${NAME_MAX_WORDS} слов`,
    ),
  email: z
    .string()
    .email("Неверный формат электронной почты")
    .min(3)
    .max(
      EMAIL_MAX_LEN,
      `Электронная почта должна быть не длиннее ${EMAIL_MAX_LEN} символов`,
    ),
  phone: z
    .string()
    .transform((data) => data.replaceAll(/\D/, ""))
    .pipe(
      z
        .string()
        .min(
          PHONE_MIN_LEN,
          `Номер телефона должен быть не короче ${PHONE_MIN_LEN} символов (не учитывая любые символы, кроме цифр)`,
        )
        .max(
          PHONE_MAX_LEN,
          `Номер телефона должен быть не длиннее ${PHONE_MAX_LEN} символов (не учитывая любые символы, кроме цифр)`,
        ),
    ),
  avatarUrl: z
    .string()
    .url("Ссылка на аватар должна быть рабочей ссылкой на изображение")
    .max(
      AVATAR_URL_MAX_LEN,
      `Ссылка на аватар должна быть не длиннее ${AVATAR_URL_MAX_LEN} символов`,
    ),
});

export default UserEditSchema;
