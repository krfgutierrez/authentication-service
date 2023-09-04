import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountModel } from '@database/models/account.model';
import SessionModel from '@database/models/session.model';
import { UserModel } from '@database/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AccountModel, SessionModel, UserModel]),
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule { }
