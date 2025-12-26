import { pool } from '../database/db.js'
import {Category} from '../models/category.model.js'
export class CategoryService{
    async getCategories(): Promise<Category[]>{
        const query = `SELECT * FROM category ORDER BY name`;
            const queryRows = (await pool.query(query)).rows
            .map(row => new Category(row.id, row.name));
            return queryRows;
    }
    async getCategoryById(id : string ): Promise<Category | undefined> {
        const query = `SELECT * FROM category WHERE category.ID=$1`;
        const rows = (await pool.query(query, [id])).rows;       

        if(rows.length===0){ 
            return undefined
        }
            return new Category(rows[0].id, rows[0].name);

    }
    async deleteCategoryById(id: string): Promise<Category | undefined> {
        const query =  `DELETE FROM category WHERE category.id=$1 RETURNING *`;
        const rows = (await pool.query(query, [id])).rows;
        if(rows.length===0){ 
            return undefined
        }
            return new Category(rows[0].id, rows[0].name);   
    }   
    async changeCategoryName(id: string, name: string): Promise<Category | undefined>{
        const query = 'UPDATE category SET name = $1 WHERE category.id=$2 RETURNING *';
        const row = (await pool.query(query, [name, id])).rows;
        if(row.length>0){ 
            return new Category(row[0].id, row[0].name);
        }
        else{
            return undefined;
        }
    }
    async createCategory(name: string) : Promise<Category>{
        const query = `INSERT INTO category (name) VALUES ($1) RETURNING *`;
        const rows = (await pool.query(query, [name])).rows;
        return new Category(rows[0].id, rows[0].name);
    }
}