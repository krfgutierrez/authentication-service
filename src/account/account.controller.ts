import { IAccount } from '@interfaces/account/account.interface';
import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import NewAccountDto from './dtos/new-account.dto';
import { AccountService } from './account.service';
import LoginAccountDto from './dtos/login-account.dto';

@Controller('account')
export class AccountController {

  constructor(private service: AccountService) { }

  @Post()
  @HttpCode(201)
  async register(@Body() account: NewAccountDto): Promise<Partial<IAccount>> {
    const { id, username, createdAt } = await this.service.create(account);
    return { id, username, createdAt };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() account: LoginAccountDto): Promise<Partial<IAccount>> {
    const response = await this.service.findOne(account);
    if (!response) {
      throw new UnauthorizedException('Invalid username and/or password.');
    }
    const { id, username } = res;
    return { id, username };
  }

}
