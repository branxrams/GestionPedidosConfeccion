/*
  Warnings:

  - You are about to drop the `producto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_categoriaId_fkey`;

-- DropTable
DROP TABLE `producto`;

-- CreateTable
CREATE TABLE `Colegio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `colegioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Talla` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Precio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prendaId` INTEGER NOT NULL,
    `tallaId` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prenda` ADD CONSTRAINT `Prenda_colegioId_fkey` FOREIGN KEY (`colegioId`) REFERENCES `Colegio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Precio` ADD CONSTRAINT `Precio_prendaId_fkey` FOREIGN KEY (`prendaId`) REFERENCES `Prenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Precio` ADD CONSTRAINT `Precio_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `Talla`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
