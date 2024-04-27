/*
  Warnings:

  - A unique constraint covering the columns `[productGalleryId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productPreviewId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "productGalleryId" TEXT,
ADD COLUMN     "productPreviewId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_productGalleryId_key" ON "Media"("productGalleryId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_productPreviewId_key" ON "Media"("productPreviewId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_productGalleryId_fkey" FOREIGN KEY ("productGalleryId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_productPreviewId_fkey" FOREIGN KEY ("productPreviewId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
