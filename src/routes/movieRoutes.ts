import {Router} from 'express';
import {MovieController} from '../controllers/movie.controller.js'; 
export const router = Router();

const movieController = new MovieController (); 
router.get('/', (req, res)=> movieController.getMovies(req, res));
router.get<{id: string}>(new RegExp('/(?<id>\\d+)'), (req, res)=> movieController.getMovieById(req, res));
router.delete<{id: string}>(new RegExp('/(?<id>\\d+)'), (req, res)=> movieController.deleteById(req, res));
router.put<{id:string}>(new RegExp('/(?<id>\\d+)'), (req, res)=> movieController.overWriteMovie(req, res));
router.post(new RegExp('^//?$'), (req, res)=> movieController.createMovie(req, res));
export default router;  
