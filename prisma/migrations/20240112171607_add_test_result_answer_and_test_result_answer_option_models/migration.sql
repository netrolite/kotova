-- CreateTable
CREATE TABLE "TestResultAnswer" (
    "id" STRING NOT NULL,
    "type" INT4 NOT NULL,
    "textAnswer" STRING,

    CONSTRAINT "TestResultAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResultAnswerOption" (
    "id" STRING NOT NULL,
    "tableAnsewr" STRING,
    "isChecked" BOOL,
    "testResultAnswerId" STRING NOT NULL,

    CONSTRAINT "TestResultAnswerOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestResultAnswerOption" ADD CONSTRAINT "TestResultAnswerOption_testResultAnswerId_fkey" FOREIGN KEY ("testResultAnswerId") REFERENCES "TestResultAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
