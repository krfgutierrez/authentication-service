import { Model, Column, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  userId: string;

  @BelongsTo(() => User, 'user_id')
  user: User

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

