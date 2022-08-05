# Customer Feedback App

Full-stack Customer Feedback application:
- Front End app 
- RESTful API app
- MongoDB container

## How to run

You can run all 3 parts of the application simultaneously in Docker using `docker-compose`.

First, make sure you have Docker installed on your computer.\
Then, in the project directory, run `docker-compose up --build`

This command will:
1. Build the applications for production.
2. Build Docker images for each application. 
3. Create and run all 3 containers.
4. Bind the containers to a shared network.

After the containers are up and running, open [localhost:8080](http://localhost:8080) to view the Front End app.

If you don't want to fill in a lot of reviews yourself, you can populate the DB with mocked reviews by sending a POST request to [localhost:9000/reviews/populate](http://localhost:9000/reviews/populate).

## What's left to improve

- Add pagination to fetch and display all reviews instead of the latest ones.
- Add a logger.
- Add a build script with SonarCloud stage to analyse test coverage.
- Add tests to the API app.
- Optimize the API app's production build.
- Add new features to the API app (DB reconnection, Webpack config, Swagger documentation, etc.).