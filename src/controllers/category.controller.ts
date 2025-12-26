import type { Request, Response } from 'express';
import {CategoryService} from '../services/category.service.js' 
import { DatabaseError } from 'pg';
export class CategoryController{
service = new CategoryService();
    async getCategories(req : Request, res: Response): Promise<Response>{
        try{
            console.log(`[categoryController.getCategories()] - calling the service Method`);
            const categories = await this.service.getCategories();
            console.log(`[categoryController.getCategories()] - returning a json with the categories array`);
            return res.json(categories);
        }
        catch(error){
            console.error(`[categoryController.getCategories()] -error caught, returning a 500 status response
                \n Error: ${error}`);
            return res.status(500).json({error: "The Sever failed at querying the Categories"});
        }
    }
    async getCategoryById(req : Request<{id: string}>, res: Response): Promise<Response>{
        const {id} = req.params;
        try{
            console.log(`[categoryController.getCategoryById()]- calling the service method`);
            const row = await this.service.getCategoryById(id);
            if(!row){
                console.error(`[categoryController.getCategoryById()]- the return was undefined, returning a 404 status response`);
                return res.status(404).json({error: "Category not Found"});
            }
            return res.json(row);
        }
        catch(error){
            console.error(`[categoryController.getCategoryById()]- error caught, returning a 500 status response \n Error: ${error}`);
            return res.status(500).json({error: "The Server failed at querying the Category"});
        }
    }
    async deleteCategoryById(req : Request<{id: string}>, res: Response) : Promise<Response> {
        const {id} = req.params;
        try{
            console.log(`[categoryController.deleteCategoryById()]- calling the service method`);
            const row = await this.service.deleteCategoryById(id);
            if(!row){
                console.log(`[categoryController.deleteCategoryById()]-  the return was undefined, returning a 404 status response`);
                return res.status(404).json({error: "Category not Found"});
            }
            console.log(`[categoryController.deleteCategoryById()]- returning a response with the deleted category`);
            return res.json(row);
        }
        catch(error){
            if(error instanceof DatabaseError){
                if (error.code === '23503'){
                    console.error(`[categoryController.deleteCategoryById()]- error caught, 
                        returning a 400 status response
                        \n Error: ${error}`);
                    return res.status(400).json(
                        {
                            error: "Can't delete a category that movies are using"
                        }
                    )
                }
            }
            console.error(`[categoryController.deleteCategoryById()]- error caught, 
                returning a 500 status response
                \n Error: ${error}`);
            return res.status(500).json({error: "The Server failed at deleting the Category"});
        }
    }
    async changeCategoryName(req: Request<{id: string}>, res: Response) : Promise<Response>{
        console.log(`[categoryController.changeCategoryName()]- getting the name from the request.body`)
        const name  = req.body.name;
        const {id} = req.params;
        try{    
        console.log(`[categoryController.changeCategoryName()]- calling the service method`)
           const row = await this.service.changeCategoryName(id, name);
           if(!row){
            console.log(`[categoryController.changeCategoryName()]- the service returned undefined, returning a 404 status response`);
            return res.status(404).json({error: "Category not found"}); 
           }
            console.log(`[categoryController.changeCategoryName()]- returning the category with its new name`);
           return res.json(row);  
        }catch(error){
            console.error(`[categoryController.changeCategoryName()]- error caught, 
                returning a 500 status response
                \n Error: ${error}`);
            return res.status(500).json({error: `The sever failed at changing category's name`});
        }
    }
    async createCategory(req: Request, res: Response) : Promise<Response> {
        console.log(`[categoryController.createCategory()]- getting the name from the request body`);
        const name = req.body.name;
        try{
        console.log(`[categoryController.createCategory()]- calling the service method`);
            const newCategory = await this.service.createCategory(name);
        console.log(`[categoryController.createCategory()]- returning a 201 status response with the created category`);
            return res.status(201).json(newCategory);
        }
        catch(error){
            console.error(`[categoryController.createCategory()]- error caught, 
                returning a 500 status response
                \n Error: ${error}`);
            return res.status(500).json({error: `The Sever failed at Creating the Category`})
        }
    }
}