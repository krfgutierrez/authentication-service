import { IsEmail, IsNotEmpty } from "class-validator";

export default class LoginAccountDto {
  @IsNotEmpty()
  @IsEmail()
  readonly username: String;
  @IsNotEmpty()
  readonly password: String;
}