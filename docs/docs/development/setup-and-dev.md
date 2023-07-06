---
sidebar_position: 1
---

# Setup and development

- [Setup and development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
    - [Database](#database)
    - [Configuration](#configuration)
    - [Dev server](#dev-server)
  - [Generators](#generators)
  - [Docker](#docker)
    - [Docker installation](#docker-installation)
    - [Docker-compose installation](#docker-compose-installation)
    - [Run](#run)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (at least 9.0)

## Installation

```bash
# Install dependencies from package.json
npm install

# or
npm ci
```

> Note: don't delete package-lock.json before installation, See more [in npm docs](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)

### Database

> Note: in this project we are using raw sql with [PostgreSQL](https://www.postgresql.org/).

### Configuration

Before start install PostgreSQL and fill correct configurations in `.env` file

```bash
# local.env or staging.env

PORT=3001
DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USER='nestjs_gql_pg'
DATABASE_PASSWORD='0c80139e6e6349eebc99fe7fcfc901e7'
DATABASE_NAME='nestjs_gql_pg'
DATABASE_SYNCHRONIZE='false'
FIREBASE_CREDENTIALS='{}'
JWT_SECRET='c1e630b7a62b43b43m43ij2md8e8c03a'
CACHE_TTL=3600
```

Some helper script to work with database

```bash
# Create new Migration
dbmate new create_users_table

# Run Migrations
npm run apply-migrations
```

##### Docker Compose

### Dev server

> Note: If you're on Linux and see an `ENOSPC` error when running the commands below, you must [increase the number of available file watchers](https://stackoverflow.com/questions/22475849/node-js-error-enospc#answer-32600959).

```bash
# Launch the dev server
npm run start:dev

# Launch the dev server with file watcher
npm run watch:dev

# Launch the dev server and enable remote debugger with file watcher
npm run debug:dev
```

## Generators

This project includes generators to speed up common development tasks. Commands include:

> Note: Make sure you already have the nest-cli globally installed

```bash
# Install nest-cli globally
npm install @nestjs/cli -g

# Generate a new service
nest generate service users

# Generate a new class
nest g class users
```
> Note: if you love generators then you can find full list of command in official [Nest-cli Docs](https://docs.nestjs.com/cli/usages#generate-alias-g).

## Docker

if you are familiar with [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose) then you can run built in docker-compose file, which will install and configure application and database for you.

### Docker installation

Download docker from Official website

- Mac <https://docs.docker.com/docker-for-mac/install/>
- Windows <https://docs.docker.com/docker-for-windows/install/>
- Ubuntu <https://docs.docker.com/install/linux/docker-ce/ubuntu/>

### Docker-compose installation

Download docker from [Official website](https://docs.docker.com/compose/install)

### Run

Open terminal and navigate to project directory and run the following command.

```bash
PORT=3000 docker-compose up
```

> Note: application will run on port 3000 (<http://localhost:3000>)

Navigate to <http://localhost:8080> and connect to you database with the following configurations

```text
host: postgres
user: postgres
pass: postgres
```

create database `nestjs-gql-pg` and your application fully is ready to use.

### Reference
- [Awesome NestJS Boilerplate Documentation](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/development.html#first-time-setup)