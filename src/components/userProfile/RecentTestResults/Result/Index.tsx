import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserProfileTestResultTitle from "./Title";
import UserProfileTestResultDescription from "./Description";
import UserProfileTestResultContent from "./Content";
import UserProfileTestResultLink from "./Link";

type Props = {};

export default function UserProfileTestResult({}: Props) {
  return (
    <li>
      <UserProfileTestResultLink>
        <Card>
          <CardHeader>
            <UserProfileTestResultTitle />
            <UserProfileTestResultDescription />
          </CardHeader>
          <CardContent>
            <UserProfileTestResultContent />
          </CardContent>
        </Card>
      </UserProfileTestResultLink>
    </li>
  );
}
