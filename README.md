
# Overview

  

This project is a multi-container web application that includes:

  

-  **Backend:** A Spring Boot application that connects to a MySQL

database.

  

-  **Frontend:** A Vite/React application served by Nginx.

  

-  **Database:** A MySQL 8.0 instance managed with Docker Compose.

  

# Prerequisites

  

- [Docker](https://www.docker.com/get-started) and [Docker

Compose](https://docs.docker.com/compose/install/) installed on your

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

  

-  **mysql:** Uses the official MySQL 8.0 image. It creates a database

named `db` and a non-root user (`cvip` with password `cvip`). It

maps the container's MySQL port (3306) to host port 3307 and

persists data using a Docker volume.

  

## Example `docker-compose.yml`

  

``` {.yaml language="yaml"}

services:
  frontend:
    build: ./fe
    volumes:
      - ./fe:/app
      - /app/node_modules  # Prevents overwriting container’s node_modules with an empty host folder
    ports:
      - "5173:5173"
    command: npm run dev


  mysql:
    image: mysql:8.0
    ports:
      - "3307:3306"
    environment:
      MYSQL_ROOT_PASSWORD: cvip
      MYSQL_DATABASE: db
      MYSQL_USER: cvip
      MYSQL_PASSWORD: cvip
    volumes:
      - mysql_data:/var/lib/mysql
      - ./initdb:/docker-entrypoint-initdb.d
    restart: unless-stopped

volumes:
  mysql_data:

```

  

**Note:** The backend connects to MySQL using the hostname `mysql` and

port `3306` (internal). On your host, MySQL is available on port `3307`.

  

# How to Run the Application

  

## Build and Start Containers

  

1.  **Build the Backend:**\

From the `be` directory, run:

  

``` {.bash language="bash"}

cd be

mvn clean package

```

  

2.  **Start the Containers:**\

Return to the project root and run:

  

``` {.bash language="bash"}

cd ..

docker-compose up --build

```

  

This command will:

  

- Build the Docker images for the backend and frontend.

  

- Create and start containers for the backend, frontend, and

MySQL.

  

- Set up the database with the provided environment variables and

(if available) execute any initialization scripts in the

`initdb` folder.

  

## Access the Application

  

-  **Frontend:** Open your browser and navigate to

<http://localhost:5173> to access the frontend served by Nginx.

  

-  **Backend:** The backend API is available at

<http://localhost:8080>.

  

-  **MySQL:** To connect from your host, run:

  

``` {.bash language="bash"}

mysql -h 127.0.0.1 -P 3307 -u cvip -p db

```

  

Then enter the password (`cvip`) when prompted.

  

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
