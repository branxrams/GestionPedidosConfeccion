/*
  Warnings:

  - You are about to drop the `precio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `talla` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoPrendaId` to the `Prenda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `precio` DROP FOREIGN KEY `Precio_prendaId_fkey`;

-- DropForeignKey
ALTER TABLE `precio` DROP FOREIGN KEY `Precio_tallaId_fkey`;

-- AlterTable
ALTER TABLE `prenda` ADD COLUMN `tallaPiernaId` INTEGER NULL,
    ADD COLUMN `tallaTorsoId` INTEGER NULL,
    ADD COLUMN `tipoPrendaId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `precio`;

-- DropTable
DROP TABLE `talla`;

-- CreateTable
CREATE TABLE `TipoPrenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TallaTorso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TallaPierna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrecioTorso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precio` DOUBLE NOT NULL,
    `colegioId` INTEGER NOT NULL,
    `prendaId` INTEGER NOT NULL,
    `tallaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrecioPierna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precio` DOUBLE NOT NULL,
    `colegioId` INTEGER NOT NULL,
    `prendaId` INTEGER NOT NULL,
    `tallaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prenda` ADD CONSTRAINT `Prenda_tallaTorsoId_fkey` FOREIGN KEY (`tallaTorsoId`) REFERENCES `TallaTorso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prenda` ADD CONSTRAINT `Prenda_tallaPiernaId_fkey` FOREIGN KEY (`tallaPiernaId`) REFERENCES `TallaPierna`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prenda` ADD CONSTRAINT `Prenda_tipoPrendaId_fkey` FOREIGN KEY (`tipoPrendaId`) REFERENCES `TipoPrenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioTorso` ADD CONSTRAINT `PrecioTorso_prendaId_fkey` FOREIGN KEY (`prendaId`) REFERENCES `Prenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioTorso` ADD CONSTRAINT `PrecioTorso_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `TallaTorso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioTorso` ADD CONSTRAINT `PrecioTorso_colegioId_fkey` FOREIGN KEY (`colegioId`) REFERENCES `Colegio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioPierna` ADD CONSTRAINT `PrecioPierna_prendaId_fkey` FOREIGN KEY (`prendaId`) REFERENCES `Prenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioPierna` ADD CONSTRAINT `PrecioPierna_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `TallaPierna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioPierna` ADD CONSTRAINT `PrecioPierna_colegioId_fkey` FOREIGN KEY (`colegioId`) REFERENCES `Colegio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
