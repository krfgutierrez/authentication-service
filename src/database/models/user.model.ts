import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import TransactionCode from './transaction-code.model';

@Table({
  timestamps: true,
  createdAt: 'create_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
})
export default class User extends Model {
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
}