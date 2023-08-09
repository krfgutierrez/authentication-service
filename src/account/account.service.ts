import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import NewAccountDto from './dtos/new-account.dto';
import { AccountModel } from 'database/models/account.model';
import { IAccount } from '@interfaces/account/account.interface';
import LoginAccountDto from './dtos/login-account.dto';

@Injectable()
export class AccountService {

  constructor(@InjectModel(AccountModel) private repository: typeof AccountModel) {}

  async create(account: NewAccountDto): Promise<IAccount> {
    const response = await this.repository.create({ ...account});
    return response.toJSON();
  }

  async findOne(account: LoginAccountDto): Promise<IAccount> {
    const {username, password} = account;
    const response = await this.repository.findOne({
      where: {
        username,
        password
      }
    });
    return response?.toJSON();
  }

}
