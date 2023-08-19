import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountModel } from 'database/models/account.model';
import SessionModel from 'database/models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AccountModel, SessionModel]),
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule { }
