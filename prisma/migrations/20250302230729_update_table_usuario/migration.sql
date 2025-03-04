/*
  Warnings:

  - You are about to drop the column `login` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Usuario_login_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "login";
