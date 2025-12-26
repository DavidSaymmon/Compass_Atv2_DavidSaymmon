import {Router} from 'express';
import {CategoryController} from '../controllers/category.controller.js'
import {MovieController} from '../controllers/movie.controller.js'; 

export const router = Router();


const categoryController = new CategoryController();
const movieController = new MovieController();
router.get('/', (req, res)=> categoryController.getCategories(req, res));

router.get<{id: string}>(new RegExp('^/(?<id>\\d+)/?$'),
    (req, res)=> categoryController.getCategoryById(req, res));

router.get<{id: string}>(new RegExp('^/(?<id>\\d+)/movies/?$'),
    (req, res)=> movieController.getMoviesByCategoryId(req, res));

router.delete<{id: string}>(new RegExp('^/(?<id>\\d+)/?$'), 
    (req, res)=> categoryController.deleteCategoryById(req, res));
router.put<{id: string}>(new RegExp('^/(?<id>\\d+)/?$'), 
    (req, res)=> categoryController.changeCategoryName(req, res)); 
router.post(new RegExp('^//?$'), (req, res)=> categoryController.createCategory(req, res));
export default router;