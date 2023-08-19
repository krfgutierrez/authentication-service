import ISession, { INewSession } from "@interfaces/session/session.interface";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AccountModel } from "./account.model";

@Table({
  tableName: 'session',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
})
export default class SessionModel extends Model<ISession, INewSession> {

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @ForeignKey(() => AccountModel)
  @Column({
    type: DataType.UUID,
  })
  accountId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  accessToken: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  refreshToken: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt: string;

  @BelongsTo(() => AccountModel)
  account: AccountModel;

}