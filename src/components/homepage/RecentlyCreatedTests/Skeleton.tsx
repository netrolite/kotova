import RepeatingElem from "@/components/RepeatingElem";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomepageRecentlyCreatedTestsSkeleton() {
  return (
    <ul className="space-y-2">
      <RepeatingElem
        count={10}
        elem={
          <li>
            <Card>
              <CardHeader className="pb-4">
                <Skeleton className="h-[24px] w-[260px]" />
                <Skeleton className="h-[20px] w-[160px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[24px] w-[200px]" />
              </CardContent>
            </Card>
          </li>
        }
      />
    </ul>
  );
}
