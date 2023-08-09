import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export default class NewAccountDto {
  @IsNotEmpty()
  @IsEmail({})
  readonly username: String;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  readonly password: String;
}