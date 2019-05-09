-- Drops movies database if already exists --
DROP DATABASE IF EXISTS movies_db;
-- Creates movies database for use with current project --
CREATE DATABASE movies_db;

-- DROP TABLE movie;
-- DROP TABLE review

-- Copy/Pasted from SQL Workbench when applying movie id as foreign key to review table
/*ALTER TABLE `movies_db`.`review` 
ADD CONSTRAINT `movie_id`
  FOREIGN KEY (`movie_id`)
  REFERENCES `movies_db`.`movie` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION; */
