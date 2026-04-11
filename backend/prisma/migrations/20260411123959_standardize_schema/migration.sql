/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ContactInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HeroSection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cloudinaryId` on the `HeroSection` table. All the data in the column will be lost.
  - The primary key for the `Occasion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cloudinaryId` on the `Occasion` table. All the data in the column will be lost.
  - The primary key for the `SignatureSweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cloudinaryId` on the `SignatureSweet` table. All the data in the column will be lost.
  - The primary key for the `WeddingStat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HeroSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SignatureSweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WeddingStat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "ContactInfo" DROP CONSTRAINT "ContactInfo_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ContactInfo_id_seq";

-- AlterTable
ALTER TABLE "HeroSection" DROP CONSTRAINT "HeroSection_pkey",
DROP COLUMN "cloudinaryId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publicId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ADD CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HeroSection_id_seq";

-- AlterTable
ALTER TABLE "Occasion" DROP CONSTRAINT "Occasion_pkey",
DROP COLUMN "cloudinaryId",
ADD COLUMN     "publicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ADD CONSTRAINT "Occasion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Occasion_id_seq";

-- AlterTable
ALTER TABLE "SignatureSweet" DROP CONSTRAINT "SignatureSweet_pkey",
DROP COLUMN "cloudinaryId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publicId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ADD CONSTRAINT "SignatureSweet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SignatureSweet_id_seq";

-- AlterTable
ALTER TABLE "WeddingStat" DROP CONSTRAINT "WeddingStat_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WeddingStat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WeddingStat_id_seq";
