-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "phone" STRING,
    "image" STRING,
    "role" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Test" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "avgScore" INT4,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "grades" INT4[],
    "createdByUserId" STRING NOT NULL,
    "subjectId" STRING NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestion" (
    "id" STRING NOT NULL,
    "testId" STRING NOT NULL,
    "question" STRING NOT NULL,
    "type" INT4 NOT NULL,
    "correctAnswerText" STRING,
    "explanation" STRING,

    CONSTRAINT "TestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestionOption" (
    "id" STRING NOT NULL,
    "content" STRING,
    "isCorrect" BOOL,
    "tableColumn" STRING,
    "tableColumnAnswer" STRING,
    "testQuestionId" STRING NOT NULL,

    CONSTRAINT "TestQuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" STRING NOT NULL,
    "score" FLOAT8 NOT NULL,
    "wrongQuestionsIds" STRING[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "testId" STRING,
    "userId" STRING,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestionOption" ADD CONSTRAINT "TestQuestionOption_testQuestionId_fkey" FOREIGN KEY ("testQuestionId") REFERENCES "TestQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
