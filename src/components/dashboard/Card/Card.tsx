import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import styles from "./card.module.scss";

type Props = {
  title: string;
  children: ReactNode;
  link?: {
    href: string;
    label: string;
  };
};

export default function DashboardCard({ children, title, link }: Props) {
  const content = (
    <Card className={`${styles.card}`}>
      <CardHeader className="pb-1">
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="text-xl font-semibold">{children}</CardContent>
      {link && (
        <CardFooter className={`flex gap-1`}>
          <span className={styles.cardFooterLinkLabel}>{link.label}</span>
          <ArrowRightIcon />
        </CardFooter>
      )}
    </Card>
  );

  if (link)
    return (
      <Link className="hover:no-underline" href={link.href}>
        {content}
      </Link>
    );
  return content;
}
