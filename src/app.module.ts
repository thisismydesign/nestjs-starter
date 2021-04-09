import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import Next from 'next';
import { RenderModule } from 'nest-next';

import { EmployeesModule } from './employees/employees.module';
import { CompaniesModule } from './companies/companies.module';
import { SeedService } from './console/seed.service';
import { PartnersModule } from './partners/partners.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { OrdersModule } from './orders/orders.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    EmployeesModule,
    CompaniesModule,
    PartnersModule,
    VouchersModule,
    OrdersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: '',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConsoleModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
  ],
  providers: [SeedService],
  controllers: [AppController],
})
export class AppModule {}
