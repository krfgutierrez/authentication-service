import { IsEmail, IsNotEmpty } from "class-validator";

export default class LoginAccountDto {
  @IsNotEmpty()
  @IsEmail()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}