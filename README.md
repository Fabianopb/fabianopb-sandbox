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

Create development database if it doesn't exist:
```
yarn create-dev-db
```

Start development mode:
```
yarn start
```

### Using pgAdmin 4

pgAdmin 4 also runs in a docker container, so after starting the containers with `docker-compose up`, open [http://localhost:5050](http://localhost:5050) and use the pgAdmin email and password defined in the environment.

Create a new server using the `postgres` `container_name` defined in [docker-compose.yml](./docker-compose.yml) as the host name, and db, user, and password defined under the `postgres` in the same file.
