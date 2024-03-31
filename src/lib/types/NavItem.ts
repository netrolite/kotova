import { ReactElement } from "react";

export type NavItem = {
  href: string;
  label: string;
  icon: ReactElement;
  requiresAuth?: boolean;
};
