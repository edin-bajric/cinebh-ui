# The frontend of the Cinebh app

This frontend is a part of the Cinebh application, it contains the user interface and services which interact with the backend

**Currently, the frontend has the general folder structure outlined with .gitkeep files inside of the folders in order for them to be included in the repository**

## Specifications
React

TypeScript

Vite

Node.js

### Libraries
TBD

## Setup and running

`git clone https://github.com/edin-bajric/cinebh-ui.git`

`cd cinebh-uí`

`npm install`

`npm run dev`

## Deployment

### prerequisites: Docker and Docker Compose

`create a new folder and cd into it`

`git clone https://github.com/edin-bajric/cinebh-ui.git`

`if the docker-compose.yml already exists from the backend repo, you can skip this part`

`in the root folder create a new file called docker-compose.yml and paste the following code`

```

services:
postgres:
image: postgres:16.4
environment:
POSTGRES_DB: 
POSTGRES_USER: 
POSTGRES_PASSWORD:
volumes:
- postgres_data:/var/lib/postgresql/data
ports:
- "5432:5432"
networks:
- default

backend:
build:
context: ./cinebh
environment:
DB_URL: 
DB_USERNAME: 
DB_PASSWORD: 
MG_DOMAIN: 
MG_FROM_EMAIL: 
MG_PASSWORD: 
JWT_SECRET:
depends_on:
- postgres
ports:
- "8080:8080"

frontend:
build:
context: ./cinebh-ui
container_name: cinebh-frontend-1
depends_on:
- backend
ports:
- "80:80"

volumes:
postgres_data:

```

`fill in the environment variables in the docker-compose.yml file`

`docker-compose up --build`

`the frontend will be running on http://localhost`
