import 'dotenv/config';
import {Pool} from 'pg';
import fs from 'fs';
import { fileURLToPath } from "url";
import path from 'path';
export const pool = new Pool({connectionString: process.env.DATABASE_URL});

const dirname = path.dirname(fileURLToPath(import.meta.url));

export async function runMigrations() {
// Path to migrations compiled into JS, located in the 'dist' folder
  const categoryPath = path.resolve(
    dirname, `./create_category_table.sql`
  );

  const moviePath = path.resolve(
    dirname, `./create_movie_table.sql`
  );

  const createCategorySQL = fs.readFileSync(categoryPath, "utf8");
  await pool.query(createCategorySQL);

  const createMovieSQL = fs.readFileSync(moviePath, "utf8");
  await pool.query(createMovieSQL);
}