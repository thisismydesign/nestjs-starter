# NestJS Starter

Opinionated NestJS boilerplate for rapid development with battle-tested standards.

[Use this template](https://github.com/thisismydesign/nestjs-starter/generate)

## Stack

It has
- Example REST and GraphQL modules, DB using TypeORM as seen on https://docs.nestjs.com/
- [Next.js](https://nextjs.org/) integration for server-rednered React pages
- Authentication via [Passport.js](http://www.passportjs.org/) including Social providers and [AWS Cognito](https://aws.amazon.com/cognito/) and JWT strategy for REST and GraphQL
- Docker setup
- Typescript, ESLint
- CI via GitHub Actions
- Console for task running (including DB seeding) via [nestjs-console](https://github.com/Pop-Code/nestjs-console)
- Unit and integration testing via Jest
- Heroku deployment setup

## Usage

```sh
cp .env.example .env
docker-compose up
docker-compose exec web yarn console seed
docker-compose exec web yarn lint
docker-compose exec db psql -U postgres -c 'create database test;'
docker-compose exec web yarn test
docker-compose exec web yarn test:e2e
docker-compose exec web yarn build
```

REST endpoint via Nest
- http://localhost:3000/

JWT-protected REST endpoint via Nest
- http://localhost:3000/private

GraphQL playground (`query WhoAmI` is JWT-protected)
- http://localhost:3000/graphql

Cognito auth (redirects to hosted Cognito UI)
- http://localhost:3000/auth/cognito

Google auth
- http://localhost:3000/auth/google

Next.js page
- http://localhost:3000/home

JWT-protected Next.js page
- http://localhost:3000/profile

## Deloyment

```sh
heroku git:remote --app <app-name>
heroku stack:set container
heroku config:set NODE_ENV=production
heroku config:set <all config from .env.example>
heroku addons:create heroku-postgresql:hobby-dev
```

### Useful commands

Nest CLI:
```
docker-compose exec web yarn nest -- --help
```

TypeORM CLI:
```
docker-compose exec web yarn typeorm -- --help
```

## Resources

- https://github.com/jmcdo29/testing-nestjs
