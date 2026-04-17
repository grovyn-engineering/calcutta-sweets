-- AlterTable
ALTER TABLE "Occasion" ADD COLUMN     "iconKey" TEXT NOT NULL DEFAULT 'Heart',
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;
