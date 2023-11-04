-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_emails` VARCHAR(191) NOT NULL,
    `agent_emails` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NULL,
    `date_created` DATETIME(3) NOT NULL,
    `date_modified` DATETIME(3) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
