import { IUser, INewUser } from "@interfaces/user/user.interface";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AccountModel } from "./account.model";


@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
})
export class UserModel extends Model<IUser, INewUser> {

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
    type: DataType.CHAR(100),
  })
  firstName: string;

  @Column({
    type: DataType.CHAR(100),
  })
  lastName: string;

  @Column({
    type: DataType.DATEONLY,
  })
  dateOfBirth: string;

}

