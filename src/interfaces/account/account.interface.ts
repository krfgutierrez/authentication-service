import { Optional } from "sequelize";

export interface IAccount {
  id: String;
  username: String;
  password: String;
  twoFaKey: String;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface INewAccount {
  username: String;
  password: String;
}