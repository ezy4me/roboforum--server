/*
  Warnings:

  - You are about to drop the column `type` on the `DiscussionFiles` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ProjectFiles` table. All the data in the column will be lost.
  - Added the required column `file` to the `DiscussionFiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `ProjectFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscussionFiles" DROP COLUMN "type",
ADD COLUMN     "file" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectFiles" DROP COLUMN "type",
ADD COLUMN     "file" TEXT NOT NULL;
