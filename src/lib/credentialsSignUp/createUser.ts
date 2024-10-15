import { db } from "../db";
import { ROLE } from "../types/enums/Role";

type Params = {
  email: string;
  password: string;
  name: string;
};

export default function credentialsSignUpCreateUser({
  email,
  password,
  name,
}: Params) {
  return db.user.create({
    data: { role: ROLE.STUDENT, email, password, name },
  });
}
