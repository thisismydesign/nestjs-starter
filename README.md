# NestJS Playground

## Usage

```sh
docker-compose -up
dc exec web npm run console -- seed
```

http://localhost:3000/graphql

## Tips

> It is helpful to organize your code by your so-called domain model (similar to the way you would organize entry points in a REST API). In this approach, keep your models (ObjectType classes), resolvers and services together within a Nest module representing the domain model. Keep all of these components in a single folder per module.

Nest CLI:
```
dc exec web npm run nest -- --help
```

TypeORM CLI:
```
dc exec web npm run typeorm -- --help
```
