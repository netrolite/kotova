import { db } from "../db";
import { ROLE } from "../types/enums/Role";

type Params = {
  email: string;
  hashedPassword: string;
  name: string;
};

export default function credentialsSignUpCreateUser({
  email,
  hashedPassword,
  name,
}: Params) {
  return db.user.create({
    data: { role: ROLE.STUDENT, email, password: hashedPassword, name },
  });
}
