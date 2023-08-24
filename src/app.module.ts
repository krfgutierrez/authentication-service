import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './account/account.module';
import { AccountModel } from 'database/models/account.model';
import TransactionCode from 'database/models/transaction-code.model';
import IConfigDatabase from '@interfaces/config/config_database';
import SessionModel from 'database/models/session.model';
import { UserModel } from 'database/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const database = config.get<IConfigDatabase>('database');
        return {
          dialect: 'postgres',
          "host": database.host,
          "port": database.port,
          "database": database.name,
          "username": database.username,
          "password": database.password,
          logging: database.enable_log,
          underscore: true,
          models: [
            AccountModel,
            TransactionCode,
            SessionModel,
            UserModel,
          ],
        };
      }
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
