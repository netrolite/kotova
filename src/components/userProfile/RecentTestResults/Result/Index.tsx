import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserProfileTestResultTitle from "./Title";
import UserProfileTestResultDescription from "./Description";
import UserProfileTestResultContent from "./Content";
import UserProfileTestResultLink from "./Link";
import cardStyles from "@/styles/card.module.scss";

type Props = {};

export default function UserProfileTestResult({}: Props) {
  return (
    <li>
      <UserProfileTestResultLink>
        <Card className={cardStyles.card}>
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
