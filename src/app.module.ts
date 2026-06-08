import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    // ENV Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // PostgreSQL Database Connection
   TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,  port: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT)
    : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,

  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}),

    // GraphQL Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      path: '/graphql',
    }),

    // Modules
    UserModule,
    AuthModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}