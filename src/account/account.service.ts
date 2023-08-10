import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ms from 'ms';
import addToDate from 'date-fns/add';

import NewAccountDto from './dtos/new-account.dto';
import { AccountModel } from 'database/models/account.model';
import { IAccount } from '@interfaces/account/account.interface';
import LoginAccountDto from './dtos/login-account.dto';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import ISession from './interfaces/session';
import { IConfigSecurityAuthentication, IConfigSecurityPassword } from '@interfaces/config/config_security';

@Injectable()
export class AccountService {

  constructor(@InjectModel(AccountModel) private repository: typeof AccountModel, private config: ConfigService) { }

  async create(account: NewAccountDto): Promise<IAccount> {
    const { password } = account;
    const { salt: saltRound } = this.config.get<IConfigSecurityPassword>('security.password.salt');
    const salt = await genSalt(saltRound);
    const hashedPassword = await hash(password, salt);

    const response = await this.repository.create({ ...account, password: hashedPassword, });
    return response.toJSON();
  }

  async findOne(account: LoginAccountDto): Promise<Partial<ISession>> {
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
    const config = this.config.get<IConfigSecurityAuthentication>('security.authentication');
    const [atExpiresAt, rtExpiresAt] = this.generateTokenExpiration(new Date(), config);
    // Create a access token JWT 
    const accessToken = this.generateJwtToken({
      payload: {
        id: response.id,
        username: response.username,
      },
      expiresIn: atExpiresAt,
      secret: config.access_token.secret,
    });
    // Create a refresh token JWT 
    const refreshToken = this.generateJwtToken({
      payload: {
        id: response.id,
        username: response.username,
      },
      expiresIn: rtExpiresAt,
      secret: config.refresh_token.secret,
    },);

    return {
      accessToken,
      refreshToken,
      // getTime() will return a milliseconds. It is divided by 100 to get the equivalent in seconds.
      expiresAt: atExpiresAt.getTime() / 100
    }
  }

  /**
   * Generate expiration dates for access token and refresh token. 
   * 
   * This function will get the current date then generate two dates which adds the duration of access token and refresh token.
   * @param baseDate the date that the expirations will be added to.
   * @param config The configuration for authentication. This is retreive from the ConfigService.
   * @returns This will return an array of Date which have the dates in order: Access token expiration and Refresh token expiration.
   */
  private generateTokenExpiration(baseDate: Date, config: IConfigSecurityAuthentication): Date[] {

    const atExpiresAt = addToDate(baseDate, {
      // The duration from the config is in String format. Example: 10 days. This is design to make the config readable.
      // The function `ms`will return a milliseconds. It is divided by 100 to get the equivalent in seconds.
      seconds: ms(config.access_token.duration) / 100
    });
    const rtExpiresAt = addToDate(baseDate, {
      // The duration from the config is in String format. Example: 10 days. This is design to make the config readable.
      // The function `ms`will return a milliseconds. It is divided by 100 to get the equivalent in seconds.
      seconds: ms(config.refresh_token.duration) / 100
    });
    return [atExpiresAt, rtExpiresAt];
  }


  /**
   * Generate a JWT token
   * @param params {
   *   payload: The payload to include in the JWT
   *   expiresIn: The expiration of the JWT
   *   secret: The secret or private key to be used for encryption 
   * }
   * @returns 
   */
  private generateJwtToken(params: {
    payload: Record<string, any>, expiresIn: Date, secret?: string,
  }): string {
    const { payload, secret, expiresIn } = params;
    
    const token = sign(payload, secret, {
      // getTime() will return a milliseconds. It is divided by 100 to get the equivalent in seconds.
      expiresIn: Math.floor(expiresIn.getTime() / 100),
    });
    return token;
  }

}
