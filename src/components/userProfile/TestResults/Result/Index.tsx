import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTestResultTitle from "./Title";
import UserTestResultDescription from "./Description";
import UserTestResultContent from "./Content";
import UserTestResultLink from "./Link";

type Props = {};

export default function UserTestResult({}: Props) {
  return (
    <li>
      <UserTestResultLink>
        <Card>
          <CardHeader>
            <UserTestResultTitle />
            <UserTestResultDescription />
          </CardHeader>
          <CardContent>
            <UserTestResultContent />
          </CardContent>
        </Card>
      </UserTestResultLink>
    </li>
  );
}
