# NestJS Playground

## Usage

```sh
docker-compose -up
dc exec web npm run console -- seed
```

http://localhost:3000/graphql

### Useful commands

Nest CLI:
```
dc exec web npm run nest -- --help
```

TypeORM CLI:
```
dc exec web npm run typeorm -- --help
```

## Learnings

Limitations:
- Nested queries not supported by TypeORM https://github.com/typeorm/typeorm/issues/2707#issuecomment-748011818
- No schema in TypeORM: https://github.com/typeorm/typeorm/issues/664

## TODO

- tests
- Seed: https://stackoverflow.com/questions/51198817/typeorm-how-to-seed-database
