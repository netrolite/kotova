import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-1">
        <Skeleton className="h-[20px] w-[100px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[28px] w-[80px]" />
      </CardContent>
      <CardFooter className="block">
        <Skeleton className="h-[24px] w-[140px]" />
      </CardFooter>
    </Card>
  );
}
