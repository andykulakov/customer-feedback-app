# RESTful API application

Basic RESTful API application made using 
- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nginx

## Available scripts

In the project directory, you can run:

### `npm run dev`

Runs the application in the development mode.\
Make sure you have a MongoDB Docker container running before you start the app.

The app will run on `http://localhost:9000`.

### `npm run build`

Builds the application for production to the `dist` folder.

### `npm run start`

Runs the application's production build.

## Endpoints

### `/reviews` (GET)

A list of the latest reviews. Sorted by date and limited to 12 items.

### `/reviews` (POST)

Adds a new review to the DB.

### `/reviews` (DELETE)

Deletes all reviews from the DB.

### `/reviews/populate` (POST)

Populates the DB with mocked reviews.