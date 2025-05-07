
# Overview

  

This project is a multi-container web application that includes:

  

-  **Backend:** A Spring Boot application that connects to a MySQL
database.
  

-  **Frontend:** A Vite/React application served by Nginx.

  

-  **Database:** A MySQL 8.0 instance managed with Docker Compose.

  

# Prerequisites

  

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your

machine.

  

- (Optional) A MySQL client if you wish to connect to the database

from your host.

  

# Project Structure

  

The project directory is organized as follows:

  

Web-Project-HCMIU/

    Web-Project-HCMIU/
    ├── be/                      # Backend (Spring Boot) project
    │   └── target/*.jar         # Compiled JAR file
    ├── fe/                      # Frontend (Vite/React) project
    │   ├── Dockerfile           # Dockerfile for the frontend (using Nginx)
    │   └── src/ ...             # Source code
    ├── initdb/                  # (Optional) SQL or shell scripts to initialize MySQL
    ├── docker-compose.yml
    └── README.md

  

# Configuration

  

The `docker-compose.yml` file defines three services:
  

-  **frontend:** Builds the Vite/React application from the `fe`

directory, exposes port 5173, and depends on the backend.

- **backend**: Build the SpringBoot Application

-  **mysql:** Uses the official MySQL 8.0 image. For privacy, I'm doing the MySQL local, so that just my contributor can access. 

## Example `docker-compose.yml`


``` {.yaml language="yaml"}

services:
  frontend:
    build: ./fe
    volumes:
      - ./fe:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    command: npm run dev

  backend:
    build: ./be
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://100.93.79.71:3306/db
      - SPRING_DATASOURCE_USERNAME=cvip
      - SPRING_DATASOURCE_PASSWORD=roadtowf
    volumes:
      - ./uploaded-videos:/app/videos

```

  

**Note:** I'm using tailscale for making the IP that connect between remote and local machine.

  

# How to Run the Application

  

## Build and Start Containers

Everything I have put in the docker, so you just have the docker and run the command line:

```
docker-compose up --build
```
 
This command will:

  

- Build the Docker images for SQL, backend and frontend.



- Create and start containers for the frontend, backend and MySQL.

## Access the Application

  

-  **Frontend:** Open your browser and navigate to

<http://localhost:5173> to access the frontend served by Nginx.

  

-  **Backend:** The backend API is available at

<http://localhost:8080>.

  

-  **MySQL:** Not available


## Stop the Application

  

To stop all running containers, press `Ctrl+C` in the terminal running

`docker-compose up` or run:

  

``` {.bash language="bash"}
docker-compose  down
```

  

# Troubleshooting

  

-  **Port Conflicts:** If you encounter errors like \"port is already

in use,\" check if another service (e.g., a local MySQL instance) is

running on that port. Adjust the port mapping in

`docker-compose.yml` as needed.

  

-  **Viewing Logs:** To view logs for a specific service, run:

  

``` {.bash language="bash"}

docker-compose logs frontend

docker-compose logs mysql

```

  

-  **Rebuild Without Cache:** If changes are not being picked up,

rebuild the containers with:

  

``` {.bash language="bash"}

docker-compose build --no-cache

```

  

# Customization

  

-  **Initialization Scripts:** Place any SQL or shell scripts to run on

first startup in the `initdb` folder. These scripts will be executed

automatically when the MySQL container is created.

  

-  **Application Configuration:** Update your backend configuration

(e.g., `application.properties` in Spring Boot) to match the

environment variables specified in `docker-compose.yml`.
