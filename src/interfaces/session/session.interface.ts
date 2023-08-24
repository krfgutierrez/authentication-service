import Entity from "@interfaces/entity.interface";

export interface INewSession {
  // Unlike other fields, the id for session will programatically created. 
  // This is because the id will be included in the payload of access token and refresh token for the project to be able to track them in the database.
  id: string;
  accountId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export default interface ISession extends INewSession, Entity { }