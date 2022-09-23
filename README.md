# fabianopb-sandbox-pern
Sandbox project to migrate deprecated portfolio and try out stuff


### Setting up the development environment

Install dependencies:
```
yarn install
```

Create a duplicate of `.env.example` and rename it to `.env`, changing the environment variables according to your setup.

Start docker containers:
```
docker-compose up
```

Create development database if it doesn't exist using `mongo-express` at [http://localhost:8081/](http://localhost:8081/).

Start development mode:
```
yarn start
```