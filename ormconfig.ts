import * as dotenv from 'dotenv';

dotenv.config();

export = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  entities: ['src/server/app/**/*.entity.ts'],
  migrations: ['src/server/migration/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/server/migration',
  },
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
};
