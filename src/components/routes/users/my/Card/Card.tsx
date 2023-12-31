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

type Props = {
  title: string;
  children: ReactNode;
  link?: {
    href: string;
    label: string;
  };
};

export default function DashboardCard({ children, title, link }: Props) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="text-xl font-semibold">{children}</CardContent>
      {link && (
        <CardFooter>
          <Link className="flex gap-1 underline" href={link.href}>
            <span>{link.label}</span>
            <ArrowRightIcon />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
