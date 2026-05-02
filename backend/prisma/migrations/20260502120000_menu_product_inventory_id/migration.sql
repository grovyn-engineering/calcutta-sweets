-- AlterTable
ALTER TABLE "MenuProduct" ADD COLUMN "inventoryProductId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MenuProduct_inventoryProductId_key" ON "MenuProduct"("inventoryProductId");
