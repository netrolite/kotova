import { User } from "next-auth";
import { Role } from "./enums/Role";

type CustomUser = User & { role: Role };
export default CustomUser;
