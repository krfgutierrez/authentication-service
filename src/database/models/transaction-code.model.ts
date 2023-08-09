import { Model, Column, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { AccountModel } from './account.model';


@Table({
  timestamps: true,
  createdAt: 'create_at',
  updatedAt: 'updated_at',
  underscored: true,
})
export default class TransactionCode extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => AccountModel)
  @Column({
    type: DataType.UUID
  })
  accountId: string;

  @BelongsTo(() => AccountModel, 'account_id')
  account: AccountModel

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  validUntil: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  type: string;
}

