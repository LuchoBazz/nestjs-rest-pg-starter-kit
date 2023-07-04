<h1 align="center">Nest.js using GraphQL and Raw PostgreSQL Starter Kit</h1>

<p align="center">A starter kit for creating Nest.js projects with GraphQL and raw PostgreSQL.</p>

## Description

This starter kit provides a template for creating Nest.js projects with GraphQL as the API layer and raw PostgreSQL for database operations.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations
```bash
# Create new Migration
dbmate new create_users_table

# Run Migrations
npm run apply-migrations
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - LuchoBazz
- Twitter - [@LuchoBazz](https://twitter.com/LuchoBazz)

## License

This project is licensed under the [MIT licensed](LICENSE).. See the LICENSE file for details.

### Reference

- https://github.com/mwanago/nestjs-raw-sql/tree/master