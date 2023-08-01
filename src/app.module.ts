import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          dialect: 'postgres',
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          database: config.get<string>('database.name'),
          logging: config.get<boolean>('database.enableLogging'),
          username: config.get<string>('database.username'),
          password: config.get<string>('database.password'),
          underscore: true,
          models: [],
        };
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
