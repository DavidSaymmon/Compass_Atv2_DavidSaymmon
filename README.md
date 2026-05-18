# Movies API

REST API for managing movie records and their categories, with data persisted in PostgreSQL.

## Overview

This project provides endpoints to:

- create, list, update, and delete categories
- create, list, update, and delete movies
- list movies that belong to a specific category

The database tables are created automatically when the server starts.

## Stack

- Node.js 22.15.0
- TypeScript 5.9.3
- Express 5.2.1
- PostgreSQL 
- pg 8.16.3
- dotenv 17.2.3

## Requirements

- Node.js 22 or higher
- PostgreSQL running locally
- a valid database connection string in `.env`

## Environment Variables

Create a `.env` file in the project root, you can find a template of how it shoud look like in /.env.example

## Running the Project

Install dependencies:

```bash
npm install
```

Run the project in development mode:

```bash
npm start
```

Build the project:

```bash
npm run build
```

Run the compiled version:

```bash
node dist/index.js
```

If everything is configured correctly, the API will be available at:

```txt
http://localhost:3002
```

## Project Structure

```txt
src/
|-- controllers/   # Request handling
|-- database/      # Database connection and SQL migrations
|-- models/        # Entity models
|-- routes/        # Route definitions
|-- services/      # Business logic
`-- index.ts       # Application entry point
```

## Endpoints

### Categories

| Method | Route                    | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| GET    | `/categories`            | Returns all categories                  |
| GET    | `/categories/:id`        | Returns one category by ID              |
| GET    | `/categories/:id/movies` | Returns movies from a specific category |
| POST   | `/categories`            | Creates a category                      |
| PUT    | `/categories/:id`        | Updates a category name                 |
| DELETE | `/categories/:id`        | Deletes a category                      |

### Movies

| Method | Route         | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/movies`     | Returns all movies      |
| GET    | `/movies/:id` | Returns one movie by ID |
| POST   | `/movies`     | Creates a movie         |
| PUT    | `/movies/:id` | Replaces a movie by ID  |
| DELETE | `/movies/:id` | Deletes a movie         |


## Insomnia

An Insomnia collection is available in:

```txt
insomnia/Movies_API_Insomnia_Collection.json
```

Suggested test flow:

1. Import the collection into Insomnia
2. Run `Create Category`
3. Run `List Categories`
4. Set `category_id` in the Insomnia environment
5. Run `Create Movie`
6. Run the remaining `GET`, `PUT`, and `DELETE` requests
