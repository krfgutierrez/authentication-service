import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import TransactionCode from './transaction-code.model';
import { INewAccount, IAccount } from '@interfaces/account/account.interface';
import SessionModel from './session.model';

@Table({
  tableName: 'accounts',
  timestamps: true,
  createdAt: 'create_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
})
export class AccountModel extends Model<IAccount, INewAccount> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  twoFaKey: string;

  @HasMany(() => TransactionCode)
  transactionCode: TransactionCode[]

  @HasMany(() => SessionModel)
  sessions: SessionModel[];
}