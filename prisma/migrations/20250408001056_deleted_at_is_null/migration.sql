-- AlterTable
ALTER TABLE `Categories` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Products` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Sessions` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `deleted_at` DATETIME(3) NULL;
