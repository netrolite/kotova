import useUserTestResultContext from "@/lib/hooks/user/testResults/testResultContext";
import formatTestScore from "@/lib/formatTestScore";

type Props = {};

export default function UserProfileTestResultContent({}: Props) {
  const { score } = useUserTestResultContext();
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground">Баллы</span>
      <span className="flex gap-0.5 font-medium">{formatTestScore(score)}</span>
    </div>
  );
}
