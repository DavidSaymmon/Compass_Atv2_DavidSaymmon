CREATE TABLE IF NOT EXISTS movie(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  director VARCHAR(255) NOT NULL,
  release_year INTEGER NOT NULL,
  genre VARCHAR(255) NOT NULL,
  category_id INTEGER NOT NULL,
  
  FOREIGN KEY (category_id) REFERENCES category(id),
  CONSTRAINT validate_release_year
    CHECK (release_year <= EXTRACT(YEAR FROM NOW()))
);