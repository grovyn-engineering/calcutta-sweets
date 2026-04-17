-- AlterTable
ALTER TABLE "ContactInfo" ADD COLUMN     "visitHeroImageUrl" TEXT,
ADD COLUMN     "visitHeroPublicId" TEXT,
ADD COLUMN     "visitHeroEyebrow" TEXT,
ADD COLUMN     "visitHeroTitle" TEXT,
ADD COLUMN     "visitHeroDescription" TEXT,
ADD COLUMN     "visitDirectionsUrl" TEXT,
ADD COLUMN     "visitFeaturesHeading" TEXT,
ADD COLUMN     "visitFeaturesSubtitle" TEXT;

-- CreateTable
CREATE TABLE "VisitUsFeature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publicId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitUsFeature_pkey" PRIMARY KEY ("id")
);
