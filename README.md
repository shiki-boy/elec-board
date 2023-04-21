# EB - Electricity Board

## How do I get this set up on my system?

You would need to have docker installed in your system to run this.
[Install Docker desktop](https://www.docker.com/products/docker-desktop/)

### Backend setup
- run  `cp .env.template .env` - that will create a .env file
- run `docker-compose up` - this will build the docker containers (if they are not there) and start the containers
- run `docker-compose up -d` - if you don't want to keep the docker logs running after `docker-compose up`
- the backend will run on localhost:8000
- `docker-compose logs -f service-name-here` - to see the logs, service-name = backend | postgres | ...

### Frontend setup
- run `cd frontend`
- run `pnpm i`
- run `pnpm dev` - to run the dev server
- run `pnpm build` - to build the frontend

Note: Frontend can also be built by `docker-compose up frontend`. This will create a dist directory inside frontend folder.

The frontend `dist` folder is getting served by django

To stop the server run `docker-compose down`

---

## How to see mails
- The mails are sent to mailhog on localhost:8025

## Load seed data in DB
- run `make bash`
- run `python manage.py loaddata seed.json`

## Some common commands
- `make bash` - takes you inside the backend docker container running
- `make shell`- runs django shell_plus inside the backend container
- refer to the `Makefile` for some more commands