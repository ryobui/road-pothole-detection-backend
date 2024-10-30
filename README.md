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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build App

```bash
$ docker-compose up --build
```

## Create container MYSQL

```bash
$ cd docker/mysql
```

```bash
$ docker build -t mysqlv1 .
```

```bash
$ docker run -d --name mysqlservice -p 3306:3306 mysqlv1
```

## Create container Redis

```bash
$ cd docker/redis
```

```bash
$ docker build -t redisv1 .
```

```bash
$ docker run -d --name redisservice -p 3306:3306 redisv1
```

## Format Code

```bash
$ npm run pretty
```

## Thank you !!!