CREATE TABLE IF NOT EXISTS `USERS` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(50) NULL DEFAULT NULL ,
  `fullName` VARCHAR(50) NULL DEFAULT NULL ,
  `username` VARCHAR(50) NULL DEFAULT NULL ,
  `password` VARCHAR(50) NULL DEFAULT NULL ,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) 
);

CREATE TABLE IF NOT EXISTS `CLASSROOMS` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `className` VARCHAR(50) NOT NULL ,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) , 
  UNIQUE (`className`)
);

CREATE TABLE IF NOT EXISTS `NOTES` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `attachment` LONGTEXT NULL DEFAULT NULL ,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  `user_id` INTEGER NOT NULL ,
  `classroom_id` INTEGER NOT NULL  ,
  PRIMARY KEY (`id`) ,
  FOREIGN KEY (`user_id`) REFERENCES USERS(`id`) ,
  FOREIGN KEY (`classroom_id`) REFERENCES CLASSROOMS(`id`)
);

CREATE TABLE IF NOT EXISTS `SAVED` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `user_id` INTEGER NOT NULL ,
  PRIMARY KEY (`id`) ,
  FOREIGN KEY (`user_id`) REFERENCES USERS(`id`)
);

CREATE TABLE IF NOT EXISTS `TAGS` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(50) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `CLASSUSERS` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `user_id` INTEGER NOT NULL ,
  `classroom_id` INTEGER NOT NULL ,
  PRIMARY KEY (`id`) ,
  FOREIGN KEY (`user_id`) REFERENCES USERS(`id`) ,
  FOREIGN KEY (`classroom_id`) REFERENCES CLASSROOMS(`id`)
);

CREATE TABLE IF NOT EXISTS `SAVEDNOTES` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `saved_id` INTEGER NOT NULL ,
  `note_id` INTEGER NOT NULL ,
  PRIMARY KEY (`id`) ,
  FOREIGN KEY (`saved_id`) REFERENCES SAVED(`id`) ,
  FOREIGN KEY (`note_id`) REFERENCES NOTES(`id`)
);

CREATE TABLE IF NOT EXISTS `TAGNOTES` (
  `id` INTEGER NOT NULL AUTO_INCREMENT ,
  `tag_id` INTEGER NOT NULL ,
  `note_id` INTEGER NOT NULL ,
  PRIMARY KEY (`id`) ,
  FOREIGN KEY (`tag_id`) REFERENCES TAGS(`id`) ,
  FOREIGN KEY (`note_id`) REFERENCES NOTES(`id`)
);
