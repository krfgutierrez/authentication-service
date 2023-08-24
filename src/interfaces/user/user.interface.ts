import Entity from "@interfaces/entity.interface";

export interface INewUser {
  accountId: string;
}

export interface IUser extends INewUser, Entity {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}