-- CreateTable
CREATE TABLE "CelebrationHero" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "eyebrow" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "mainImageUrl" TEXT,
    "mainPublicId" TEXT,
    "secondaryLeftUrl" TEXT,
    "secondaryLeftPublicId" TEXT,
    "secondaryRightUrl" TEXT,
    "secondaryRightPublicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CelebrationHero_pkey" PRIMARY KEY ("id")
);
