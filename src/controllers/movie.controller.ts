import {MovieService} from '../services/movie.service.js'
import type { Request, Response } from 'express';
import {DatabaseError} from 'pg';
export class MovieController{
    service = new MovieService();
    async getMovies(req : Request, res: Response): Promise<Response>{
        try{
            console.log(`[MovieController.getMovies()] - 
                calling the service.getMovies() method`);
            const movies = await this.service.getMovies();
            console.log(`[MovieController.getMovies()] - 
                returning a json with the movies Array`);
            return res.json(movies);
        }
        catch(error){
            console.error(`error catched, returning a 500 status response
                \n Error: ${error}`);
            return res.status(500).json({error: "The Sever failed at querying the Movies"});
        }
    }
    async getMovieById(req: Request<{id: string}>, res: Response): Promise<Response>{
        console.log(`[MovieControler.getMovieById()]- getting the id from request parammeters`);
        const {id} = req.params;
        try { 
            
        console.log(`[MovieControler.getMovieById()]- calling the getMovieById() method from Service`);
        const movie = await this.service.getMovieById(id);
           if(!movie){
                console.log(`[MovieControler.getMovieById()]- returning status 404 response`);
                return res.status(404).json({error: `Movie Not Found`});
           } 
           console.log(`[MovieControler.getMovieById()]- returning a json with the movie atributes`);
           return res.json(movie);
        }
        catch(error){
            console.error(`[MovieControler.getMovieById()]- error catched, returning an status 500 response \n 
                Error: ${error}`);
            return res.status(500).json({error: `The Sever failed at querying the Movie`})
        }
   
    }
    async deleteById(req: Request<{id: string}>, res: Response): Promise<Response>{
        console.log(`[movieController.deleteById()] - getting the id from request parameters`)
        const {id} = req.params;
        try{
            console.log(`[movieController.deleteById()] - calling the service method`);
            const row = await this.service.deleteMovieById(id);
            if(!row){
                console.log(`[movieController.deleteById()] - returning a 404 status response`);
                return res.status(404).json({error: "Movie not Found"});
            }
            console.log(`[movieController.deleteById()] - returning a json with the deleted movie`);
            return res.json(row);
        }catch(error){
            console.error(`[movieController.deleteById()] - error catched, returning a 500 status response`);
            return res.status(500).json({error: "The Server failed at deleting the Movie"});
        }
    }
    async getMoviesByCategoryId(req : Request<{id: string}>, res: Response) : Promise<Response>{
        console.log(`[movieControler.getMoviesByCategoryId()]- getting the id from request parameters`)
        const {id}=req.params;
        try{
            console.log(`[movieControler.getMoviesByCategoryId()]- calling the service method`);
            const movies = await this.service.getMoviesByCategoryId(id);
            if(movies.length===0){
            
                console.log(`[movieControler.getMoviesByCategoryId()]- returning status 404 response`);
                return res.status(404).json({error: `Movie not found`});
            }
            console.log(`[movieControler.getMoviesByCategoryId()]- returning a json with the movie`);
            return res.json(movies); 
        }
        catch(error){
            console.error(`[movieControler.getMoviesByCategoryId()]- an error was catched, returning an status 500 response
                \n Error: ${error}`);
            return res.status(500).json({error: "The Server failed  at querying the Movies"})
        }
    }
    async overWriteMovie(req: Request<{id: string}>, res: Response): Promise<Response>{
        console.log(`[movieController.overWriteMovie()]- getting the id from request parameters`);
        const {id} = req.params;
        console.log(`[movieController.overWriteMovie()]- getting the atributes from the request body`);
        const atributes = req.body;
        atributes.id=id;
        try{
            console.log(`[movieController.overWriteMovie()]- calling the method from service`);
            const newMovie = await this.service.overWriteMovie(atributes);
            if(!newMovie){
                console.log(`[movieControler.overWriteMovie()]- returning status 404 response`);
                return res.status(404).json({error: "Movie Not Found"});
            }
            console.log(`[movieControler.overWriteMovie()]- returning a response with the movie`);
            return res.json(newMovie);
        }catch(error){
            console.error(`[movieControler.overWriteMovie()]- error catched, returning a status 500 response
               \n Error: ${error}`);
            return res.status(500).json({error: "The Server failed at overWriting the movie"});
        }
    }
    async createMovie(req: Request, res: Response) : Promise<Response> {
        console.log(`[movieControler.createMovie()]getting the atributes from the Request body`);
        const movieAtributes = req.body;
        try{
         console.log(`[movieControler.createMovie()]- calling the service method`);
            const newMovie = await this.service.createMovie(movieAtributes);
        console.log(`[movieControler.createMovie()]- returning a 201 status response`)
            return res.status(201).json(newMovie);
        }catch(error){
            console.error(`[movieControler.createMovie()]- error catched, returning a 500 status response
                \n Error: ${error}`)
            return res.status(500).json({error: `The Sever failed at Creating the Movie`})
        }
    }

}