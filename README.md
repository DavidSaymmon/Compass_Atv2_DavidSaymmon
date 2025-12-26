# Movies API

## Description
A REST API developed to manage a collection of movies and categories, persisting them into a PostgreSQL database.

## Technologies
- Node.js v22.15.0
- TypeScript v5.9.3
- PostgreSQL v17.45
- ECMAScript
 # Librarys
  
## How to Run
in the command line:
1.install the dependencies by typing "npm install" and pressing enter
2.to compile the code, type "npm run build" and press enter
3.to execute the javascript generated, type "node dist/index.js" and press enter
Project folder's strucutre
src/
  ├─ database/       # SQL migrations and database connector
  ├─ models/         # Movie and Category models
  ├─ routes/         # Endpoint mappings to controllers
  ├─ controllers/    # Handles requests and calls service functions
  ├─ services/       # Business logic
  ├─ middleware/     # Auxiliary functions for data validation
index.ts             # Entry point to the API
Movies Endpoints
  POST 
    /movies: Creates a new movie record.
  GET 
    /movies: Retrieves a complete list of movies.
    /movies/:id: Returns details of a specific movie based on its ID.
  PUT 
    /movies/:id: Replaces the entire movie object for the given ID.
  DELETE 
    /movies/:id: Removes a movie from the database by its ID.
Categories Endpoints (/categories)
  POST 
    /categories: creates new category.
  GET
    /categories: Returns all categories from the database.
    /categories/:id  Returns a specific category using its ID
    /categories/:id/movies: Returns all movies that belong to a specific category.
  PUT 
    /categories/:id: Updates the name of an existing category.
  DELETE 
    /categories/:id: Removes a category, provided there are no movies linked to it to ensure data integrity.
