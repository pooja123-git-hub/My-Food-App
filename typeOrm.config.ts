import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { seeds } from './seed.runner';

config();
const configService = new ConfigService();
module.exports = {
  type: 'postgres',

  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),

  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },

  synchronize: configService.get('DB_SYNCHRONIZE'),
  migrationsRun: configService.get('DB_MIGRATIONS_RUN'),

entities: [
  'src/**/*.entity.ts',
  'dist/**/*.entity.js',
],
  migrations: [
    __dirname + '/migrations/**/*{.ts,.js}',
  ],

  factories: ['dist/seeder/factories/**/*.{js,ts}'],

  seeds: seeds.map((seed) => seed.path),
};