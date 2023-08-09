import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountModel } from 'database/models/account.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AccountModel]),
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule { }
