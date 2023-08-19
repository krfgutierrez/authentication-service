import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ms from 'ms';
import addToDate from 'date-fns/add';
import { v4 as uuidV4 } from 'uuid'

import NewAccountDto from './dtos/new-account.dto';
import { AccountModel } from 'database/models/account.model';
import { IAccount } from '@interfaces/account/account.interface';
import LoginAccountDto from './dtos/login-account.dto';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import ISession, { INewSession } from '@interfaces/session/session.interface';
import { IConfigSecurityAuthentication, IConfigSecurityPassword } from '@interfaces/config/config_security';
import SessionModel from 'database/models/session.model';
import { AES } from 'crypto-js';

@Injectable()
export class AccountService {

  constructor(@InjectModel(AccountModel) private accountRepo: typeof AccountModel,
    @InjectModel(SessionModel) private sessionRepo: typeof SessionModel,
    private config: ConfigService) { }

  async create(account: NewAccountDto): Promise<IAccount> {
    const { password } = account;
    const { salt: saltRound } = this.config.get<IConfigSecurityPassword>('security.password.salt');
    const salt = await genSalt(saltRound);
    const hashedPassword = await hash(password, salt);

    const response = await this.accountRepo.create({ ...account, password: hashedPassword, });
    return response.toJSON();
  }

  async findOne(accountDto: LoginAccountDto): Promise<Partial<ISession>> {
    const { username, password } = accountDto;
    const account: AccountModel | null = await this.accountRepo.findOne({
      where: {
        username
      }
    });
    if (!account) {
      return null;
    }
    const passwordMatched: boolean = await compare(password, account.password);
    if (!passwordMatched) {
      return null;
    }
    const config = this.config.get<IConfigSecurityAuthentication>('security.authentication');
    const [atExpiresAt, rtExpiresAt] = this.generateTokenExpiration(new Date(), config);
    const sessionId = uuidV4();
    // Create a access token JWT 
    const accessToken = this.generateJwtToken({
      payload: {
        sid: sessionId,
        aid: account.id,
        u: account.username,
      },
      expiresIn: atExpiresAt,
      secret: config.access_token.secret,
    });
    // Create a refresh token JWT 
    const refreshToken = this.generateJwtToken({
      payload: {
        sid: sessionId,
        aid: account.id,
        u: account.username,
      },
      expiresIn: rtExpiresAt,
      secret: config.refresh_token.secret,
    },);
    // TODO: Encrypt access token and r efresh token before storing in the database.
    await this.encryptAndSaveSession({
      accessToken,
      refreshToken,
      id: sessionId,
      accountId: account.id,
      expiresAt: atExpiresAt,
    })
    return {
      id: sessionId,
      accessToken,
      refreshToken,
      expiresAt: atExpiresAt,
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

  private async encryptAndSaveSession(session: INewSession): Promise<void> {
    const secret: string = this.config.get<string>('security.session.encryption_secret');
    const encryptedAT = AES.encrypt(session.accessToken, secret).toString();
    const encryptedRT = AES.encrypt(session.refreshToken, secret).toString();
    await this.sessionRepo.create({
      ...session,
      accessToken: encryptedAT,
      refreshToken: encryptedRT,
      expiresAt: session.expiresAt,
    })
  }

}
