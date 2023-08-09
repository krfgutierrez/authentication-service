import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import NewAccountDto from './dtos/new-account.dto';
import { AccountModel } from 'database/models/account.model';
import { IAccount } from '@interfaces/account/account.interface';
import LoginAccountDto from './dtos/login-account.dto';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AccountService {

  constructor(@InjectModel(AccountModel) private repository: typeof AccountModel, private config: ConfigService) { }

  async create(account: NewAccountDto): Promise<IAccount> {
    const { password } = account;
    const saltRound = this.config.get('security.password.salt');
    const salt = await genSalt(saltRound);
    const hashedPassword = await hash(password, salt);

    const response = await this.repository.create({ ...account, password: hashedPassword, });
    return response.toJSON();
  }

  async findOne(account: LoginAccountDto): Promise<Partial<IAccount>> {
    const {username, password} = account;
    const response = await this.repository.findOne({
      where: {
        username
      }
    });
    if (!response) {
      return null;
    }
    const result = await compare(password, response.password);
    if (!result) {
      return null;
    }
    return {
      id: response.id,
      username: response.username,
    }
  }

}
