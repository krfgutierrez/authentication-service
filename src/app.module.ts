import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './account/account.module';
import { AccountModel } from 'database/models/account.model';
import TransactionCode from 'database/models/transaction-code.model';

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
          "host": "localhost",
          "port": 5432,
          "database": "portfolio",
          "username": "krgdev",
          "password": "krgdevpass",
          logging: config.get<boolean>('database.enableLogging'),
          underscore: true,
          models: [
            AccountModel,
            TransactionCode,
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
