import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTestResultTitle from "./Title";
import UserTestResultDescription from "./Description";
import UserTestResultContent from "./Content";

type Props = {};

export default function UserTestResult({}: Props) {
  return (
    <li>
      <Card>
        <CardHeader>
          <UserTestResultTitle />
          <UserTestResultDescription />
        </CardHeader>
        <CardContent>
          <UserTestResultContent />
        </CardContent>
      </Card>
    </li>
  );
}
