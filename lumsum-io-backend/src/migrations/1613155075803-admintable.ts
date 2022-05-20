import {MigrationInterface, QueryRunner} from "typeorm";

export class admintable1613155075803 implements MigrationInterface {
    name = 'admintable1613155075803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `admins` ADD `access` enum ('GRANT', 'REVOKE') NOT NULL DEFAULT 'GRANT'");
        await queryRunner.query("ALTER TABLE `admins` CHANGE `lastLoggedin` `lastLoggedin` datetime NULL");
        await queryRunner.query("ALTER TABLE `admins` CHANGE `role` `role` enum ('ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN'");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_c6c520dfb9a4d6dd749e73b13de`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `customerId` `customerId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_331e3c8cd8ac03ddb4365895ce0`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_204d2be3650acab162cb9601b06`");
        await queryRunner.query("ALTER TABLE `review` CHANGE `reviewById` `reviewById` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `review` CHANGE `reviewOnId` `reviewOnId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` DROP FOREIGN KEY `FK_8b6a94866e7d6ac179bbb67a1f8`");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `website` `website` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_ff56834e735fa78a15d0cf21926`");
        await queryRunner.query("ALTER TABLE `products` CHANGE `categoryId` `categoryId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_c6c520dfb9a4d6dd749e73b13de` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_331e3c8cd8ac03ddb4365895ce0` FOREIGN KEY (`reviewById`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_204d2be3650acab162cb9601b06` FOREIGN KEY (`reviewOnId`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `suppliers` ADD CONSTRAINT `FK_8b6a94866e7d6ac179bbb67a1f8` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_ff56834e735fa78a15d0cf21926` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_ff56834e735fa78a15d0cf21926`");
        await queryRunner.query("ALTER TABLE `suppliers` DROP FOREIGN KEY `FK_8b6a94866e7d6ac179bbb67a1f8`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_204d2be3650acab162cb9601b06`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_331e3c8cd8ac03ddb4365895ce0`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_c6c520dfb9a4d6dd749e73b13de`");
        await queryRunner.query("ALTER TABLE `products` CHANGE `categoryId` `categoryId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_ff56834e735fa78a15d0cf21926` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `website` `website` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `suppliers` ADD CONSTRAINT `FK_8b6a94866e7d6ac179bbb67a1f8` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` CHANGE `reviewOnId` `reviewOnId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `review` CHANGE `reviewById` `reviewById` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_204d2be3650acab162cb9601b06` FOREIGN KEY (`reviewOnId`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_331e3c8cd8ac03ddb4365895ce0` FOREIGN KEY (`reviewById`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` CHANGE `customerId` `customerId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_c6c520dfb9a4d6dd749e73b13de` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `admins` CHANGE `role` `role` enum ('ADMIN') NOT NULL DEFAULT ''ADMIN''");
        await queryRunner.query("ALTER TABLE `admins` CHANGE `lastLoggedin` `lastLoggedin` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `admins` DROP COLUMN `access`");
    }

}
