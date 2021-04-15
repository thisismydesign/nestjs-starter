module.exports = {
  "type": 'postgres',
  "url": "postgres://postgres:@db:5432",
  "entities": [
    "src/server/app/**/*.entity.ts"
  ],
  "migrations": [
    'src/server/migration/*.{ts,js}'
  ],
  "cli": {
    migrationsDir: 'src/server/migration'
  },
}
