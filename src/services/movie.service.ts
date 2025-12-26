import { pool } from '../database/db.js'
import { Movie } from '../models/movie.model.js'
export class MovieService{
        async getMovies(): Promise<Movie[]>{
            const query = `SELECT * FROM movie ORDER BY title`;
            console.log(`[MovieService.getMovies()]
                database querying`)
            const queryRows = (await pool.query(query)).rows
            console.log(`[MovieService.getMovies()] Mapping rows to Movie Model`)
            const movies = queryRows.map(row => new Movie(row.id, row.category_id,row.title, row.description, 
                    row.director, row.release_year, row.genre));
            console.log(`[MovieService.getMovies()] returning the Movie Array`)
            return movies;
        }

    async getMovieById(id: string): Promise<Movie | undefined>{
        const query = 'SELECT * FROM movie WHERE movie.id=$1';
        console.log(`[MovieService.getMovieById()]- starting the query`);
        const queryRows =(await pool.query(query, [id]));
        console.log(`[MovieService.getMovieById()]- finished the query`);
        if(queryRows.rows.length===0){
        console.log(`[MovieService.getMovieById()]- the query was empty, returning undefined`);
            return undefined;
        }
        const row = queryRows.rows[0];
        console.log(`[MovieService.getMovieById()]- creating an movie object with the row atributes`);
        const movie = new Movie(row.id, row.category_id,row.title, row.description, 
            row.director, row.release_year, row.genre);
        console.log(`[MovieService.getMovieById()]- returning the created Object`);
        return movie;
    }
    async getMoviesByCategoryId(id: string): Promise<Movie[]>{
        const query = `SELECT * FROM movie WHERE movie.category_id=$1 ORDER BY movie.title`;
        console.log(`[MovieService.getMoviesByCategoryId()]- starting the query`);
        const rows = (await pool.query(query, [id])).rows;
        console.log(`[MovieService.getMoviesByCategoryId()]- mapping the rows into a movies array`);
        const movies = rows.map(row=>new Movie(row.id, row.category_id,row.title, row.description, 
            row.director, row.release_year, row.genre));
        console.log(`[MovieService.getMoviesByCategoryId()]- returning the array`);
        return movies;
    }
    async deleteMovieById(id: string): Promise<Movie | undefined>{
        const query = `DELETE FROM movie WHERE movie.id=$1 RETURNING *`;
        console.log(`[movieService.deleteMovieById()]-starting the query`);
        const rows = (await pool.query(query, [id])).rows; 
        if(rows.length===0){
            console.log(`[movieService.deleteMovieById()]- rows.lenght===0, returning undefined`);
            return undefined;
        }
        const row = rows[0];
        const movie = new Movie(row.id, row.category_id,row.title, row.description, 
            row.director, row.release_year, row.genre);
        return movie;
    }
    async overWriteMovie(newMovie: Movie): Promise<Movie | undefined>{
        const query = `UPDATE movie SET category_id = $1, title = $2, description = $3, 
    director = $4, release_year = $5, genre = $6 WHERE id = $7 RETURNING *;`
        console.log(`[movieService.overWriteMovie()]-starting the query`);
        const row = (await pool.query(query, [newMovie.categoryId, newMovie.title, newMovie.description,
            newMovie.director, newMovie.releaseYear, newMovie.genre, newMovie.id])).rows;
        
        if(row.length===0){
            console.log(`[movieService.overWriteMovie()]- rows.lenght===0, returning undefined`);
            return undefined;
        }
        console.log(`[movieService.overWriteMovie()]- returning the mapping of the query rows into a new movie object`);
        return new Movie(row[0].id, row[0].category_id, row[0].title, row[0].description,
            row[0].director, row[0].release_year, row[0].genre);
    }
    async createMovie(newMovie: Omit<Movie, 'id'>){
        const query = `INSERT INTO movie (category_id, title, description, 
    director, release_year, genre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    console.log(`[movieService.createMovie()]-starting the query`);
    const rows = (await pool.query(query, [newMovie.categoryId, newMovie.title, newMovie.description,
            newMovie.director, newMovie.releaseYear, newMovie.genre])).rows;
    console.log(`[movieService.createMovie()]- returning the mapping of the query rows into a new movie object`);
        return new Movie(rows[0].id, rows[0].category_id, rows[0].title,
            rows[0].description, rows[0].director, rows[0].release_year, rows[0].genre);
    }
}