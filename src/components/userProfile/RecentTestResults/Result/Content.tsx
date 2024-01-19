import useUserTestResultContext from "@/lib/hooks/user/testResults/testResultContext";
import roundTestScore from "@/lib/roundTestScore";

type Props = {};

export default function UserProfileTestResultContent({}: Props) {
  const { score } = useUserTestResultContext();
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground">Баллы</span>
      <div className="flex gap-0.5 font-medium">
        <span>{roundTestScore(score)}</span>
        <span>/</span>
        <span>100</span>
      </div>
    </div>
  );
}
