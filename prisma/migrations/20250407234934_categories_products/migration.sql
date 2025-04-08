/*
  Warnings:

  - Added the required column `deleted_at` to the `Sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `TwoFactors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sessions` ADD COLUMN `deleted_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `TwoFactors` ADD COLUMN `deleted_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `deleted_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `stock` BOOLEAN NOT NULL,
    `categories_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
