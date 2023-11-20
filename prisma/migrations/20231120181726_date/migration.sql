/*
  Warnings:

  - Added the required column `date` to the `DiscussionComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `ProjectComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscussionComment" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectComment" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
