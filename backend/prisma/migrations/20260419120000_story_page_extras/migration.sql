-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "heroEyebrow" TEXT,
ADD COLUMN     "craftOverline" TEXT,
ADD COLUMN     "craftHeadline" TEXT,
ADD COLUMN     "craftImageUrl" TEXT,
ADD COLUMN     "craftPublicId" TEXT,
ADD COLUMN     "craftSteps" JSONB,
ADD COLUMN     "timelineTitle" TEXT,
ADD COLUMN     "timelineSubtitle" TEXT,
ADD COLUMN     "familySectionTitle" TEXT,
ADD COLUMN     "familyMembers" JSONB;
