import TestResultMetadataTitle from "./Title";
import TestResultMetadataSubject from "./Subject";
import TestResultMetadataTakenByUser from "./TakenByUser/Index";
import TestResultMetadataScore from "./Score";

export default async function TestResultMetadata() {
  return (
    <div className="mb-8 space-y-2">
      <div className="space-y-2">
        <div>
          <TestResultMetadataTitle />
          <TestResultMetadataSubject />
        </div>
        <div>
          <TestResultMetadataScore />
          <TestResultMetadataTakenByUser />
        </div>
      </div>
    </div>
  );
}
