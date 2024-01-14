import useUserTestResult from "@/lib/hooks/user/testResults/testResult";

type Props = {};

export default function UserTestResultContent({}: Props) {
  const { score } = useUserTestResult();
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground">Баллы</span>
      <div className="flex gap-0.5 font-medium">
        <span>{score}</span>
        <span>/</span>
        <span>100</span>
      </div>
    </div>
  );
}
