import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';

import { EmployeesModule } from './employees/employees.module';
import { CompaniesModule } from './companies/companies.module';
import { join } from 'path';

@Module({
  imports: [
    EmployeesModule,
    CompaniesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: '',
      // database: 'heyday',
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    }),
    ConsoleModule,
  ],
})
export class AppModule {}
