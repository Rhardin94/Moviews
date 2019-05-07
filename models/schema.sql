-- Drops movies database if already exists --
-- DROP DATABASE IF EXISTS movies_db;
-- Creates movies database for use with current project --
-- CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE movie (
id INT NOT NULL auto_increment primary key,
title VARCHAR(100) NOT NULL,
posterURL VARCHAR(300) NOT NULL
);

CREATE TABLE review (
id INT NOT NULL auto_increment primary key, 
text VARCHAR(500) NOT NULL,
spoiler BOOLEAN
);

-- DROP TABLE movie;
-- DROP TABLE review

-- Copy/Pasted from SQL Workbench when applying movie id as foreign key to review table
/*ALTER TABLE `movies_db`.`review` 
ADD CONSTRAINT `movie_id`
  FOREIGN KEY (`movie_id`)
  REFERENCES `movies_db`.`movie` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION; */
