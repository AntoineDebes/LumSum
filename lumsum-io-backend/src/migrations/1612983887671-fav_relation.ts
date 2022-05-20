import {MigrationInterface, QueryRunner} from "typeorm";

export class favRelation1612983887671 implements MigrationInterface {
    name = 'favRelation1612983887671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `suppliers` DROP FOREIGN KEY `FK_5f5ace2175aa7fe105a850b0647`");
        await queryRunner.query("CREATE TABLE `favorites` (`customersId` varchar(36) NOT NULL, `suppliersId` varchar(36) NOT NULL, INDEX `IDX_fcf614987ded5237220dfbb516` (`customersId`), INDEX `IDX_806d138b5b360e57a4a988591c` (`suppliersId`), PRIMARY KEY (`customersId`, `suppliersId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `suppliers` DROP COLUMN `customer_id`");
        await queryRunner.query("ALTER TABLE `admins` CHANGE `lastLoggedin` `lastLoggedin` datetime NULL");
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
        await queryRunner.query("ALTER TABLE `favorites` ADD CONSTRAINT `FK_fcf614987ded5237220dfbb5163` FOREIGN KEY (`customersId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorites` ADD CONSTRAINT `FK_806d138b5b360e57a4a988591c7` FOREIGN KEY (`suppliersId`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `favorites` DROP FOREIGN KEY `FK_806d138b5b360e57a4a988591c7`");
        await queryRunner.query("ALTER TABLE `favorites` DROP FOREIGN KEY `FK_fcf614987ded5237220dfbb5163`");
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
        await queryRunner.query("ALTER TABLE `admins` CHANGE `lastLoggedin` `lastLoggedin` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `suppliers` ADD `customer_id` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP INDEX `IDX_806d138b5b360e57a4a988591c` ON `favorites`");
        await queryRunner.query("DROP INDEX `IDX_fcf614987ded5237220dfbb516` ON `favorites`");
        await queryRunner.query("DROP TABLE `favorites`");
        await queryRunner.query("ALTER TABLE `suppliers` ADD CONSTRAINT `FK_5f5ace2175aa7fe105a850b0647` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
