import { Role } from "./types/enums/Role";

export default function getUserRoleName(userRoleFromEnum: number | Role) {
  switch (userRoleFromEnum) {
    case 1:
      return "Ученик";
    case 2:
      return "Учитель";
    case 3:
      return "Администратор";
    default:
      return null;
  }
}
