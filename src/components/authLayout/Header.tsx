import { cn } from "@/lib/shadcnUtils";
import Logo from "../Logo";
import styles from "./styles.module.scss";

type Props = {};

export default function AuthLayoutHeader({}: Props) {
  return (
    <header className={cn("m-auto mb-6 max-w-[120px]", styles.header)}>
      <Logo />
    </header>
  );
}
