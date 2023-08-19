import Entity from "@interfaces/entity.interface";

export interface INewAccount {
  username: String;
  password: String;
}

export interface IAccount extends INewAccount, Entity {
  twoFaKey: String;
}