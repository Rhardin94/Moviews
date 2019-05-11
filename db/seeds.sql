use movies_db;
INSERT INTO movies (title, posterURL)
  VALUES  ("Avengers: Infinity War", "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg"),
          ("Clue", "https://m.media-amazon.com/images/M/MV5BM2VlNTE1ZmMtOTAyNS00ODYwLWFmY2MtZWEzOTE2YjE1NDE2XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,658,1000_AL_.jpg"),
          ("Jurassic Park", "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg"),
          ("Apocalypse Now", "https://m.media-amazon.com/images/M/MV5BZTNkZmU0ZWQtZjQzMy00YTNmLWFmN2MtZGNkMmU1OThmMGYwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,652,1000_AL_.jpg"),
          ("The Sixth Sense", "https://m.media-amazon.com/images/M/MV5BMWM4NTFhYjctNzUyNi00NGMwLTk3NTYtMDIyNTZmMzRlYmQyXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg");

INSERT INTO users (name, email, password)
  VALUES  ("Ted", "thisisanemail@yahoo.com", "password23"),
          ("Ralph", "ihaveanemail@gmail.com", "muhpassword"),
          ("Lucy", "myemailiscool@aol.com", "passworded");

INSERT INTO reviews (text, spoiler, MovieId, UserId)
  VALUES  ("The Butler did it", false, 2, 1),
          ("Bruce Willis is already dead", true, 5, 1),
          ("The bad guy wins", true, 4, 2),
          ("People get eaten by dinosaurs, what's not to like?", false, 3, 3);

-- Need to set default value of createdAt and updatedAt to CURRENT_TIMESTAMP in workbench to add data this way --
-- Navigate to movies_db
  -- then Tables
      -- then right click each table and hit alter table
          -- when the window pops up, click on the createdAt column from the list, and navigate to the Default input field and write "CURRENT_TIMESTAMP"
              -- Then hit apply, and finish, then try insert values normally