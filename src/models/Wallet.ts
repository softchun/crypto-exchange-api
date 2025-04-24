import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

@Table
export class Wallet extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  wallet_id!: number;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @Column({ allowNull: false })
  currency!: string; // BTC, ETH, XRP, DOGE

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  balance!: number;

  @BelongsTo(() => User)
  user!: User;
}
