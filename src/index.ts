import express from 'express';
import  categoryRouter  from './routes/categoryRoutes.js'; 
import movieRouter from './routes/movieRoutes.js';
import {runMigrations} from './database/db.js'    
const app = express();
const PORT = process.env.PORT;
runMigrations();
app.use(express.json());
app.use(`/categories`, categoryRouter);
app.use(`/movies`, movieRouter);
app.listen(PORT, ()=>{
    console.log(`The Server is Running at http://localhost:${PORT}`)
});
